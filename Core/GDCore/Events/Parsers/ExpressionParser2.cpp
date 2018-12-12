/*
 * GDevelop Core
 * Copyright 2008-present Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#include "GDCore/Events/Parsers/ExpressionParser2.h"
#include <algorithm>
#include <memory>
#include <vector>
#include "GDCore/CommonTools.h"
#include "GDCore/Events/Expression.h"
#include "GDCore/Extensions/Metadata/ExpressionMetadata.h"
#include "GDCore/Extensions/Metadata/InstructionMetadata.h"
#include "GDCore/Extensions/Metadata/MetadataProvider.h"
#include "GDCore/Extensions/Platform.h"
#include "GDCore/Project/Layout.h"
#include "GDCore/Project/Project.h"
#include "GDCore/Tools/Localization.h"
#include "GDCore/Tools/MakeUnique.h"

using namespace std;

namespace gd {

gd::String ExpressionParser2::NUMBER_FIRST_CHAR = "+-.0123456789";

// Underscore is allowed in identifiers.
gd::String ExpressionParser2::IDENTIFIER_SEPARATOR_CHAR =
    " +-/*().,\"[]{}<>?\\=";

gd::String ExpressionParser2::OPERATORS = "+-/*";

ExpressionParser2::ExpressionParser2(
    const gd::Platform& platform_,
    const gd::ObjectsContainer& globalObjectsContainer_,
    const gd::ObjectsContainer& objectsContainer_)
    : expression(""),
      currentPosition(0),
      platform(platform_),
      globalObjectsContainer(globalObjectsContainer_),
      objectsContainer(objectsContainer_) {}

namespace {
/**
 * Return the minimum number of parameters, starting from a given parameter
 * (by convention, 1 for object functions and 2 for behavior functions).
 */
size_t GetMinimumParametersNumber(
    const std::vector<gd::ParameterMetadata>& parameters,
    size_t initialParameterIndex) {
  size_t nb = 0;
  for (std::size_t i = initialParameterIndex; i < parameters.size(); ++i) {
    if (!parameters[i].optional && !parameters[i].codeOnly) nb++;
  }

  return nb;
}

/**
 * Return the maximum number of parameters, starting from a given parameter
 * (by convention, 1 for object functions and 2 for behavior functions).
 */
size_t GetMaximumParametersNumber(
    const std::vector<gd::ParameterMetadata>& parameters,
    size_t initialParameterIndex) {
  size_t nb = 0;
  for (std::size_t i = initialParameterIndex; i < parameters.size(); ++i) {
    if (!parameters[i].codeOnly) nb++;
  }

  return nb;
}
}  // namespace

std::unique_ptr<ExpressionParserDiagnostic> ExpressionParser2::ValidateFunction(
    gd::String type,
    const gd::ExpressionMetadata& metadata,
    size_t initialParameterIndex,
    gd::String functionFullName,
    const std::vector<std::unique_ptr<ExpressionNode>>& parameters,
    size_t functionStartPosition) {
  if (gd::MetadataProvider::IsBadExpressionMetadata(metadata)) {
    return gd::make_unique<ExpressionParserError>(
        "invalid_function_name",
        _("Cannot find an expression with this name: ") + functionFullName +
            "\n" + _("Double check that you've not made any typo in the name."),
        functionStartPosition,
        GetCurrentPosition());
  }

  size_t minParametersCount =
      GetMinimumParametersNumber(metadata.parameters, initialParameterIndex);
  size_t maxParametersCount =
      GetMaximumParametersNumber(metadata.parameters, initialParameterIndex);
  if (parameters.size() < minParametersCount ||
      parameters.size() > maxParametersCount) {
    gd::String expectedCountMessage =
        minParametersCount == maxParametersCount
            ? _("The number of parameters must be exactly ") +
                  gd::String::From(minParametersCount)
            : _("The number of parameters must be: ") +
                  gd::String::From(minParametersCount) + "-" +
                  gd::String::From(maxParametersCount);

    if (parameters.size() < minParametersCount) {
      return gd::make_unique<ExpressionParserError>(
          "too_few_parameters",
          "You have not entered enough parameters for the expression. " +
              expectedCountMessage,
          functionStartPosition,
          GetCurrentPosition());
    }
  }

  return gd::make_unique<ExpressionParserDiagnostic>();
}

std::unique_ptr<TextNode> ExpressionParser2::ReadText() {
  SkipWhitespace();
  if (!IsAnyChar("\"")) {
    auto text = gd::make_unique<TextNode>("");
    text->diagnostic =
        RaiseSyntaxError(_("A text must start with a double quote (\")."));
    return text;
  }
  SkipChar();

  gd::String parsedText = "";
  bool textParsingHasEnded = false;
  bool expectEscapedCharacter = false;
  while (!IsEndReached() && !textParsingHasEnded) {
    if (GetCurrentChar() == '"') {
      if (expectEscapedCharacter) {
        parsedText += '"';
        expectEscapedCharacter = false;
      } else {
        textParsingHasEnded = true;
      }
    } else if (GetCurrentChar() == '\\') {
      if (expectEscapedCharacter) {
        parsedText += '\\';
        expectEscapedCharacter = false;
      } else {
        expectEscapedCharacter = true;
      }
    } else {
      if (expectEscapedCharacter) {
        parsedText += '\\';
      }

      parsedText += GetCurrentChar();
    }

    currentPosition++;
  }

  auto text = gd::make_unique<TextNode>(parsedText);
  if (!textParsingHasEnded) {
    text->diagnostic =
        RaiseSyntaxError(_("A text must end with a double quote (\"). Add a "
                           "double quote to terminate the text."));
  }

  return text;
}

std::unique_ptr<NumberNode> ExpressionParser2::ReadNumber() {
  SkipWhitespace();
  gd::String parsedNumber;
  if (IsAnyChar("+")) {
    SkipChar();
  } else if (IsAnyChar("-")) {
    SkipChar();
    parsedNumber += "-";
  }

  bool numberHasStarted = false;
  bool dotFound = false;
  while (!IsEndReached()) {
    if (IsAnyChar("0123456789")) {
      numberHasStarted = true;
      parsedNumber += GetCurrentChar();
    } else if (IsAnyChar(".") && !dotFound) {
      numberHasStarted = true;
      dotFound = true;
      parsedNumber += ".";
    } else {
      break;
    }

    currentPosition++;
  }

  auto number = gd::make_unique<NumberNode>(parsedNumber);
  if (!numberHasStarted) {
    number->diagnostic = RaiseSyntaxError(
        _("A number was expected. You must enter a number here."));
  }

  return number;
}

}  // namespace gd
