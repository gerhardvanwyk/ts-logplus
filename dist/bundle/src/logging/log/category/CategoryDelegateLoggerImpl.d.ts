import { LogLevel } from "../LoggerOptions";
import { MessageType } from "../standard/Logger";
import { CategoryLogger } from "./CategoryLogger";
import { Category } from "./Category";
/**
 * Delegate logger, delegates logging to given logger (constructor).
 */
export declare class CategoryDelegateLoggerImpl implements CategoryLogger {
    private _delegate;
    constructor(delegate: CategoryLogger);
    delegate: CategoryLogger;
    finest(msg: MessageType, ...categories: Category[]): void;
    finer(msg: MessageType, ...categories: Category[]): void;
    fine(msg: MessageType, ...categories: Category[]): void;
    config(msg: MessageType, ...categories: Category[]): void;
    info(msg: MessageType, ...categories: Category[]): void;
    warning(msg: MessageType, error: Error, ...categories: Category[]): void;
    severe(msg: MessageType, error: Error, ...categories: Category[]): void;
    resolved(msg: MessageType, error: Error, ...categories: Category[]): void;
    log(level: LogLevel, msg: MessageType, error: Error, ...categories: Category[]): void;
}
