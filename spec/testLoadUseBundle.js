// We test that it loads properly, we had several occasions where webpack changed order
// of loading modules and suddenly things failed to load on runtime.
// This test assures things load (if not, it fails and the build will fail).

// Note this module is transpiled to commonjs.
const { LFService, CategoryServiceFactory, CategoryConfiguration, LogLevel, Category } = require("../dist/bundle/typescript-logging.js");

// Create default logger
const loggerFactory = LFService.createLoggerFactory();

// Get a logger called "Hello"
const loggerOld = loggerFactory.getLogger("Hello");
loggerOld.severe("Log4j on error", new Error("log4j error"));

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Debug));

const catRoot1 = new Category("root1", null);
const catChild = new Category("r1child1", catRoot1);

const catRoot2 = new Category("root2", null);
const r2Child1 = new Category("r2child1", catRoot2);
const r2child11 = new Category("r2child1-1", r2Child1);
const r2Child2 = new Category("r2child2", catRoot2);

const logger = CategoryServiceFactory.getLogger(catRoot1);
logger.severe("Error in normal console", new Error("fail"), catRoot1);
logger.fine("This is on debug");

const logger2 = CategoryServiceFactory.getLogger(catRoot2);
logger2.severe(function() { return "failed"; }, function() { return new Error("oops"); });
logger2.fine(function() { return "category on debug"; });

/*
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Debug));

export const appLog: Category = new Category('myApp');
export const log: CategoryLogger = CategoryServiceFactory.getLogger(appLog);

log.debug('I see it!!!');
*/
