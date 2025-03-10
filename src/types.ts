import type { Config } from 'stylelint'

/**
 * A test case.
 */
export interface TestCase {
  /**
   * Code of the test case.
   */
  code: string,

  /**
   * A filename for this `code` property.
   */
  codeFilename?: string,

  /**
   * Description of the test case.
   */
  description?: string | undefined,

  /**
   * Whether to run only the test case. Default: `false`.
   *
   * @see https://nodejs.org/api/test.html#only-tests
   */
  only?: boolean | undefined,

  /**
   * Whether to skip the test case. Default: `false`.
   *
   * @see https://nodejs.org/api/test.html#skipping-tests
   */
  skip?: boolean | undefined,
}

/**
 * An accept test case.
 */
export type AcceptTestCase = TestCase

/**
 * A warning.
 */
export interface Warning {
  /**
   * Expected message from the test case. Usually exported from the plugin.
   * Optional if `warnings` is used.
   */
  message?: string | undefined,

  /**
   * Expected line number of the warning.
   */
  line?: number | undefined,

  /**
   * Expected column number of the warning.
   */
  column?: number | undefined,

  /**
   * Expected end line number of the warning.
   */
  endLine?: number | undefined,

  /**
   * Expected end column number of the warning.
   */
  endColumn?: number | undefined,
}

/**
 * Use the `warnings` property, rather than `message`, `line`, and `column`,
 * if the test case is expected to produce more than one warning.
 */
export type RejectTestCase = TestCase &
  Warning & {
    /**
     * Expected fixed code of the test case. Optional if `fix` isn't `true`.
     */
    fixed?: string | undefined,

    /**
     * Don't check the `fixed` code. Default: `false`.
     */
    unfixable?: boolean | undefined,

    /**
     * Warning objects containing expected `message`, `line` and `column` etc.
     * Optional if `message` is used.
     */
    warnings?: Warning[] | undefined,
  }

/**
 * A test schema.
 */
export interface TestSchema {
  /**
   * Name of the rule being tested. Usually exported from the plugin.
   */
  ruleName: string,

  /**
   * Config to pass to the rule.
   */
  config: unknown,

  /**
   * Accept test cases.
   */
  accept?: AcceptTestCase[] | undefined,

  /**
   * Reject test cases.
   */
  reject?: RejectTestCase[] | undefined,

  /**
   * Turn on autofix. Default: `false`.
   */
  fix?: boolean | undefined,

  /**
   * Maps to Stylelint's `plugins` configuration property.
   *
   * Path to the file that exports the plugin object, relative to the root.
   * Usually it's the same path as a `main` property in plugin's `package.json`.
   *
   * If you're testing a plugin pack, it's the path to the file that exports the array of plugin objects.
   *
   * Optional, if `plugins` option was passed to advanced configuration with `getTestRule()`.
   *
   * @see https://stylelint.io/user-guide/configure#plugins
   */
  plugins?: Config['plugins'] | undefined,

  /**
   * Maps to Stylelint's `customSyntax` option.
   *
   * @see https://stylelint.io/user-guide/usage/options#customsyntax
   */
  customSyntax?: string | undefined,

  /**
   * Maps to Stylelint's `codeFilename` option.
   *
   * @see https://stylelint.io/user-guide/usage/options#codefilename
   */
  codeFilename?: string | undefined,

  /**
   * Whether to run only the test case. Default: `false`.
   *
   * @see https://nodejs.org/api/test.html#only-tests
   */
  only?: boolean | undefined,

  /**
   * Whether to skip the test case. Default: `false`.
   *
   * @see https://nodejs.org/api/test.html#skipping-tests
   */
  skip?: boolean | undefined,
}

/**
 * A test case for a rule configuration.
 */
export interface RuleConfigTestCase {
  /**
   * Config of the test case.
   */
  config: unknown,

  /**
   * Description of the test case.
   */
  description?: string | undefined,

  /**
   * Whether to run only the test case. Default: `false`.
   *
   * @see https://nodejs.org/api/test.html#only-tests
   */
  only?: boolean | undefined,

  /**
   * Whether to skip the test case. Default: `false`.
   *
   * @see https://nodejs.org/api/test.html#skipping-tests
   */
  skip?: boolean | undefined,
}

/**
 * A test schema for a rule configuration.
 */
export type RuleConfigTestSchema = Pick<TestSchema, 'ruleName' | 'plugins' | 'only' | 'skip'> & {
  /**
   * Accept test cases.
   */
  accept?: RuleConfigTestCase[],

  /**
   * Reject test cases.
   */
  reject?: RuleConfigTestCase[],
}
