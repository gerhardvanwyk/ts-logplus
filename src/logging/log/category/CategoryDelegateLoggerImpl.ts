import {LogLevel} from "../LoggerOptions";
import {MessageType} from "../standard/Logger";
import {CategoryLogger} from "./CategoryLogger";
import {Category} from "./Category";

/**
 * Delegate logger, delegates logging to given logger (constructor).
 */
export class CategoryDelegateLoggerImpl implements CategoryLogger {

  private _delegate: CategoryLogger;

  constructor(delegate: CategoryLogger) {
    this._delegate = delegate;
  }

  get delegate(): CategoryLogger {
    return this._delegate;
  }

  set delegate(value: CategoryLogger) {
    this._delegate = value;
  }

  public finest(msg: MessageType, ...categories: Category[]): void {
    this._delegate.finest(msg, ...categories);
  }

  public finer(msg: MessageType, ...categories: Category[]): void {
    this._delegate.finer(msg, ...categories);
  }

  public fine(msg: MessageType, ...categories: Category[]): void {
    this._delegate.fine(msg, ...categories);
  }

  public config(msg: MessageType, ...categories: Category[]): void {
    this._delegate.config(msg, ...categories);
  }

  public info(msg: MessageType, ...categories: Category[]): void {
    this._delegate.info(msg, ...categories);
  }

  public warning(msg: MessageType, error: Error, ...categories: Category[]): void {
    this._delegate.warning(msg, error, ...categories);
  }

  public severe(msg: MessageType, error: Error, ...categories: Category[]): void {
    this._delegate.severe(msg, error, ...categories);
  }

  public resolved(msg: MessageType, error: Error, ...categories: Category[]): void {
    this._delegate.resolved(msg, error, ...categories);
  }

  public log(level: LogLevel, msg: MessageType, error: Error, ...categories: Category[]): void {
    this._delegate.log(level, msg, error, ...categories);
  }
}
