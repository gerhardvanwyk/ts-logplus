import {ExtensionHelper} from "../../extension/ExtensionHelper";
import {SimpleMap} from "../../utils/DataStructures";
import {LogFormat, LoggerType, LogLevel} from "../LoggerOptions";
import {LoggerFactory} from "./LoggerFactory";
import {LoggerFactoryImpl} from "./LoggerFactoryImpl";
import {AbstractLogger} from "./LoggerImpl";

/**
 * Defines a LogGroupRule, this allows you to either have everything configured the same way
 * or for example loggers that start with name model. It allows you to group loggers together
 * to have a certain loglevel and other settings. You can configure this when creating the
 * LoggerFactory (which accepts multiple LogGroupRules).
 */
export class LogGroupRule {

  private _regExp: RegExp;
  private _level: LogLevel;
  private _loggerType: LoggerType;
  private _logFormat: LogFormat;
  private _callBackLogger: ((name: string, logGroupRule: LogGroupRule) => AbstractLogger) | null;

  /**
   * Create a LogGroupRule. Basically you define what logger name(s) match for this group, what level should be used what logger type (where to log)
   * and what format to write in. If the loggerType is custom, then the callBackLogger must be supplied as callback function to return a custom logger.
   * @param regExp Regular expression, what matches for your logger names for this group
   * @param level LogLevel
   * @param logFormat LogFormat
   * @param loggerType Type of logger, if Custom, make sure to implement callBackLogger and pass in, this will be called so you can return your own logger.
   * @param callBackLogger Callback function to return a new clean custom logger (yours!)
   */
  constructor(regExp: RegExp, level: LogLevel, logFormat: LogFormat = new LogFormat(),
              loggerType: LoggerType = LoggerType.Console,
              callBackLogger: ((name: string, logGroupRule: LogGroupRule) => AbstractLogger) | null = null) {
    this._regExp = regExp;
    this._level = level;
    this._logFormat = logFormat;
    this._loggerType = loggerType;
    this._callBackLogger = callBackLogger;
  }

  get regExp(): RegExp {
    return this._regExp;
  }

  get level(): LogLevel {
    return this._level;
  }

  get loggerType(): LoggerType {
    return this._loggerType;
  }

  get logFormat(): LogFormat {
    return this._logFormat;
  }

  get callBackLogger(): ((name: string, logGroupRule: LogGroupRule) => AbstractLogger) | null {
    return this._callBackLogger;
  }
}

/**
 * Options object you can use to configure the LoggerFactory you create at LFService.
 */
export class LoggerFactoryOptions {

  private _logGroupRules: LogGroupRule[] = [];
  private _enabled: boolean = true;

  /**
   * Add LogGroupRule, see {LogGroupRule) for details
   * @param rule Rule to add
   * @returns {LoggerFactoryOptions} returns itself
   */
  public addLogGroupRule(rule: LogGroupRule): LoggerFactoryOptions {
    this._logGroupRules.push(rule);
    return this;
  }

  /**
   * Enable or disable logging completely for the LoggerFactory.
   * @param enabled True for enabled (default)
   * @returns {LoggerFactoryOptions} returns itself
   */
  public setEnabled(enabled: boolean): LoggerFactoryOptions {
    this._enabled = enabled;
    return this;
  }

  get logGroupRules(): LogGroupRule[] {
    return this._logGroupRules;
  }

  get enabled(): boolean {
    return this._enabled;
  }
}

/**
 * Represents the runtime settings for a LogGroup (LogGroupRule).
 */
export class LogGroupRuntimeSettings {

  private _level: LogLevel;
  private _loggerType: LoggerType;
  private _logFormat: LogFormat;
  private _callBackLogger: ((name: string, logGroupRule: LogGroupRule) => AbstractLogger) | null;

  constructor(level: LogLevel, loggerType: LoggerType, logFormat: LogFormat,
              callBackLogger: ((name: string, logGroupRule: LogGroupRule) => AbstractLogger) | null) {
    this._level = level;
    this._loggerType = loggerType;
    this._logFormat = logFormat;
    this._callBackLogger = callBackLogger;
  }

  get level(): LogLevel {
    return this._level;
  }

  set level(value: LogLevel) {
    this._level = value;
  }

  get loggerType(): LoggerType {
    return this._loggerType;
  }

  set loggerType(value: LoggerType) {
    this._loggerType = value;
  }

  get logFormat(): LogFormat {
    return this._logFormat;
  }

  set logFormat(value: LogFormat) {
    this._logFormat = value;
  }

  get callBackLogger(): ((name: string, logGroupRule: LogGroupRule) => AbstractLogger) | null {
    return this._callBackLogger;
  }

  set callBackLogger(value: ((name: string, logGroupRule: LogGroupRule) => AbstractLogger) | null) {
    this._callBackLogger = value;
  }
}

/**
 * Interface for the RuntimeSettings related to LoggerFactories.
 */
export interface LFServiceRuntimeSettings {

  /**
   * Get the runtimesettings for given LogGroup that is part of given LoggerFactory
   * @param nameLoggerFactory Name of LoggerFactory (can be specified when creating a named loggerfactory, a generated on is used otherwise).
   * @param idLogGroupRule Number representing the LogGroup (LogGroupRule)
   * @return {LogGroupRuntimeSettings} LogGroupRuntimeSettings when found, null otherwise.
   */
  getLogGroupSettings(nameLoggerFactory: string, idLogGroupRule: number): LogGroupRuntimeSettings | null;

}

class LFServiceImpl implements LFServiceRuntimeSettings {

  private static INSTANCE = new LFServiceImpl();

  private _nameCounter: number = 1;
  private _mapFactories: SimpleMap<LoggerFactoryImpl> = new SimpleMap<LoggerFactoryImpl>();

  private constructor() {
    // Private constructor.
  }

  public static getInstance(): LFServiceImpl {
    return LFServiceImpl.INSTANCE;
  }

  /**
   * Create a new LoggerFactory with given options (if any). If no options
   * are specified, the LoggerFactory, will accept any named logger and will
   * log on info level by default for, to the console.
   * @param options Options, optional.
   * @returns {LoggerFactory}
   */
  public createLoggerFactory(options: LoggerFactoryOptions | null = null): LoggerFactory {
    const name = "LoggerFactory" + this._nameCounter++;
    return this.createNamedLoggerFactory(name, options);
  }

  /**
   * Create a new LoggerFactory using given name (used for console api/extension).
   * @param name Name Pick something short but distinguishable.
   * @param options Options, optional
   * @return {LoggerFactory}
   */
  public createNamedLoggerFactory(name: string, options: LoggerFactoryOptions | null = null): LoggerFactory {
    if (this._mapFactories.exists(name)) {
      throw new Error("LoggerFactory with name " + name + " already exists.");
    }

    let factory: LoggerFactoryImpl;

    if (options !== null) {
      factory = new LoggerFactoryImpl(name, options);
    }
    else {
      factory = new LoggerFactoryImpl(name, LFServiceImpl.createDefaultOptions());
    }
    this._mapFactories.put(name, factory);

    // Allow extensions to talk with us.
    ExtensionHelper.register();

    return factory;
  }

  /**
   * Closes all Loggers for LoggerFactories that were created.
   * After this call, all previously fetched Loggers (from their
   * factories) are unusable. The factories remain as they were.
   */
  public closeLoggers(): void {
    this._mapFactories.values().forEach((factory: LoggerFactoryImpl) => {
      factory.closeLoggers();
    });

    this._mapFactories.clear();
    this._nameCounter = 1;
  }

  public getLogGroupSettings(nameLoggerFactory: string, idLogGroupRule: number): LogGroupRuntimeSettings|null {
    return null;
  }

  private static createDefaultOptions(): LoggerFactoryOptions {
    return new LoggerFactoryOptions().addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));
  }
}

/**
 * Create and configure your LoggerFactory from here.
 */
export class LFService {

  private static INSTANCE_SERVICE = LFServiceImpl.getInstance();

  /**
   * Create a new LoggerFactory with given options (if any). If no options
   * are specified, the LoggerFactory, will accept any named logger and will
   * log on info level by default for, to the console.
   * @param options Options, optional.
   * @returns {LoggerFactory}
   */
  public static createLoggerFactory(options: LoggerFactoryOptions | null = null): LoggerFactory {
    return LFService.INSTANCE_SERVICE.createLoggerFactory(options);
  }

  /**
   * Create a new LoggerFactory using given name (used for console api/extension).
   * @param name Name Pick something short but distinguishable.
   * @param options Options, optional
   * @return {LoggerFactory}
   */
  public static createNamedLoggerFactory(name: string, options: LoggerFactoryOptions | null = null): LoggerFactory {
    return LFService.INSTANCE_SERVICE.createNamedLoggerFactory(name, options);
  }

  /**
   * Closes all Loggers for LoggerFactories that were created.
   * After this call, all previously fetched Loggers (from their
   * factories) are unusable. The factories remain as they were.
   */
  public static closeLoggers(): void {
    return LFService.INSTANCE_SERVICE.closeLoggers();
  }
}