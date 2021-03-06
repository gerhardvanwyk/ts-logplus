/**
 * Log level for a logger.
 */
export declare enum LogLevel {
    Finest = 0,
    Finer = 1,
    Fine = 2,
    Config = 3,
    Info = 4,
    Warning = 5,
    Severe = 6
}
export declare namespace LogLevel {
    /**
     * Returns LogLevel based on string representation
     * @param val Value
     * @returns {LogLevel}, Error is thrown if invalid.
     */
    function fromString(val: string): LogLevel;
}
/**
 * Where to log to? Pick one of the constants. Custom requires a callback to be present, see LFService.createLoggerFactory(...)
 * where this comes into play.
 */
export declare enum LoggerType {
    Console = 0,
    MessageBuffer = 1,
    Custom = 2
}
/**
 * Defines several date enums used for formatting a date.
 */
export declare enum DateFormatEnum {
    /**
     * Displays as: year-month-day hour:minute:second,millis -> 1999-02-12 23:59:59,123
     * Note the date separator can be set separately.
     */
    Default = 0,
    /**
     * Displays as: year-month-day hour:minute:second -> 1999-02-12 23:59:59
     * Note the date separator can be set separately.
     */
    YearMonthDayTime = 1,
    /**
     * Displays as: year-day-month hour:minute:second,millis -> 1999-12-02 23:59:59,123
     * Note the date separator can be set separately.
     */
    YearDayMonthWithFullTime = 2,
    /**
     * Displays as: year-day-month hour:minute:second -> 1999-12-02 23:59:59
     * Note the date separator can be set separately.
     */
    YearDayMonthTime = 3
}
export declare namespace DateFormatEnum {
    /**
     * Returns LogLevel based on string representation
     * @param val Value
     * @returns {LogLevel}, Error is thrown if invalid.
     */
    function fromString(val: string): DateFormatEnum;
}
/**
 * DateFormat class, stores data on how to format a date.
 */
export declare class DateFormat {
    private _formatEnum;
    private _dateSeparator;
    /**
     * Constructor to define the dateformat used for logging, can be called empty as it uses defaults.
     * @param formatEnum DateFormatEnum, use one of the constants from the enum. Defaults to DateFormatEnum.Default
     * @param dateSeparator Separator used between dates, defaults to -
     */
    constructor(formatEnum?: DateFormatEnum, dateSeparator?: string);
    formatEnum: DateFormatEnum;
    dateSeparator: string;
    copy(): DateFormat;
}
/**
 * Information about the log format, what will a log line look like?
 */
export declare class LogFormat {
    private _dateFormat;
    private _showTimeStamp;
    private _showLoggerName;
    /**
     * Constructor to create a LogFormat. Can be created without parameters where it will use sane defaults.
     * @param dateFormat DateFormat (what needs the date look like in the log line)
     * @param showTimeStamp Show date timestamp at all?
     * @param showLoggerName Show the logger name?
     */
    constructor(dateFormat?: DateFormat, showTimeStamp?: boolean, showLoggerName?: boolean);
    readonly dateFormat: DateFormat;
    showTimeStamp: boolean;
    showLoggerName: boolean;
}
/**
 * Information about the log format, what will a log line look like?
 */
export declare class CategoryLogFormat {
    private _dateFormat;
    private _showTimeStamp;
    private _showCategoryName;
    /**
     * Create an instance defining the category log format used.
     * @param dateFormat Date format (uses default), for details see DateFormat class.
     * @param showTimeStamp True to show timestamp in the logging, defaults to true.
     * @param showCategoryName True to show category name in the logging, defaults to true.
     */
    constructor(dateFormat?: DateFormat, showTimeStamp?: boolean, showCategoryName?: boolean);
    dateFormat: DateFormat;
    showTimeStamp: boolean;
    showCategoryName: boolean;
    copy(): CategoryLogFormat;
}
