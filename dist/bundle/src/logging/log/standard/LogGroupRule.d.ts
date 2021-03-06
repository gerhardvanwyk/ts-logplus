import { Logger } from "./Logger";
import { LogFormat, LoggerType, LogLevel } from "../LoggerOptions";
import { LogMessage } from "./AbstractLogger";
import { LogGroupRuntimeSettings } from "./LogGroupRuntimeSettings";
/**
 * Defines a LogGroupRule, this allows you to either have everything configured the same way
 * or for example loggers that start with name model. It allows you to group loggers together
 * to have a certain loglevel and other settings. You can configure this when creating the
 * LoggerFactory (which accepts multiple LogGroupRules).
 */
export declare class LogGroupRule {
    private _regExp;
    private _level;
    private _loggerType;
    private _logFormat;
    private _callBackLogger;
    private _formatterLogMessage;
    /**
     * Create a LogGroupRule. Basically you define what logger name(s) match for this group, what level should be used what logger type (where to log)
     * and what format to write in. If the loggerType is custom, then the callBackLogger must be supplied as callback function to return a custom logger.
     * @param regExp Regular expression, what matches for your logger names for this group
     * @param level LogLevel
     * @param logFormat LogFormat
     * @param loggerType Type of logger, if Custom, make sure to implement callBackLogger and pass in, this will be called so you can return your own logger.
     * @param callBackLogger Callback function to return a new clean custom logger (yours!)
     */
    constructor(regExp: RegExp, level: LogLevel, logFormat?: LogFormat, loggerType?: LoggerType, callBackLogger?: ((name: string, settings: LogGroupRuntimeSettings) => Logger) | null);
    readonly regExp: RegExp;
    readonly level: LogLevel;
    readonly loggerType: LoggerType;
    readonly logFormat: LogFormat;
    readonly callBackLogger: ((name: string, settings: LogGroupRuntimeSettings) => Logger) | null;
    /**
     * Get the formatterLogMessage function, see comment on the setter.
     * @returns {((message:LogMessage)=>string)|null}
     */
    /**
    * Set the default formatterLogMessage function, if set it is applied to all type of loggers except for a custom logger.
    * By default this is null (not set). You can assign a function to allow custom formatting of a log message.
    * Each log message will call this function then and expects your function to format the message and return a string.
    * Will throw an error if you attempt to set a formatterLogMessage if the LoggerType is custom.
    * @param value The formatter function, or null to reset it.
    */
    formatterLogMessage: ((message: LogMessage) => string) | null;
}
