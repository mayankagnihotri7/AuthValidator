import React from "react";

import classNames from "classnames";

import {
  UPPERCASE_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHARS_REGEX,
  LENGTH_REGEX,
} from "constants/validationRules";

const rules = [
  { label: "One uppercase letter missing", pattern: UPPERCASE_REGEX },
  { label: "One number missing", pattern: NUMBER_REGEX },
  { label: "One special character missing", pattern: SPECIAL_CHARS_REGEX },
  { label: "Character length must be atleast 6 chars", pattern: LENGTH_REGEX },
];

const CheckList = ({ value }) => (
  <div className="flex flex-col gap-2">
    {rules.map((rule, idx) => {
      const cn = classNames(
        value && value.match(rule.pattern) && "text-green-700",
        "text-red-700"
      );

      return (
        <li className="flex items-center" key={idx}>
          <small className={cn}>{rule.label}</small>
        </li>
      );
    })}
  </div>
);

export default CheckList;
