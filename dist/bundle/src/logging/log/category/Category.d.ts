import { LogLevel } from "../LoggerOptions";
import { CategoryLogger } from "./CategoryLogger";
import { ErrorType, MessageType } from "../standard/Logger";
/**
 * Category for use with categorized logging.
 * At minimum you need one category, which will serve as the root category.
 * You can create child categories (like a tree). You can have multiple root
 * categories.
 */
export declare class Category implements CategoryLogger {
    private static currentId;
    private _id;
    private _name;
    private _parent;
    private _children;
    private _logLevel;
    private _logger;
    constructor(name: string, parent?: Category | null);
    readonly name: string;
    readonly parent: Category | null;
    readonly children: Category[];
    readonly logLevel: LogLevel;
    finest(msg: MessageType, ...categories: Category[]): void;
    finer(msg: MessageType, ...categories: Category[]): void;
    fine(msg: MessageType, ...categories: Category[]): void;
    config(msg: MessageType, ...categories: Category[]): void;
    info(msg: MessageType, ...categories: Category[]): void;
    warning(msg: MessageType, error: ErrorType, ...categories: Category[]): void;
    severe(msg: MessageType, error: ErrorType, ...categories: Category[]): void;
    resolved(msg: MessageType, error: ErrorType, ...categories: Category[]): void;
    log(level: LogLevel, msg: MessageType, error: ErrorType, ...categories: Category[]): void;
    getCategoryPath(): string;
    /**
     * Returns the id for this category (this
     * is for internal purposes only).
     * @returns {number} Id
     */
    readonly id: number;
    private loadCategoryLogger;
    private static nextId;
}
