import {CategoryLogger} from "../src/logging/log/category/CategoryLogger";
import {LogLevel, LoggerType} from "../src/logging/log/LoggerOptions";
import {CategoryDelegateLoggerImpl} from "../src/logging/log/category/CategoryDelegateLoggerImpl";
import {CategoryMessageBufferLoggerImpl} from "../src/logging/log/category/CategoryMessageBufferImpl";
import {Category} from "../src/logging/log/category/Category";
import {CategoryConfiguration} from "../src/logging/log/category/CategoryConfiguration";
import {CategoryServiceFactory} from "../src/logging/log/category/CategoryServiceFactory";
import waitForExpect from "wait-for-expect";

const getMessagesAsString = (logger: CategoryLogger | Category): string => {
  let delegate: CategoryDelegateLoggerImpl;
  if (logger instanceof Category) {
    delegate = (logger as any)._logger as CategoryDelegateLoggerImpl;
  }
  else {
    delegate = logger as CategoryDelegateLoggerImpl;
  }
  expect(delegate).toBeDefined();

  const actualLogger = delegate.delegate;
  expect(actualLogger instanceof CategoryMessageBufferLoggerImpl).toBeTruthy();
  return (actualLogger as CategoryMessageBufferLoggerImpl).toString();
};

const getMessages = (logger: CategoryLogger | Category): string[] => {
  let delegate: CategoryDelegateLoggerImpl;
  if (logger instanceof Category) {
    delegate = (logger as any)._logger as CategoryDelegateLoggerImpl;
  }
  else {
    delegate = logger as CategoryDelegateLoggerImpl;
  }
  expect(delegate).toBeDefined();

  const actualLogger = delegate.delegate;
  expect(actualLogger instanceof CategoryMessageBufferLoggerImpl).toBeTruthy();
  return (actualLogger as CategoryMessageBufferLoggerImpl).getMessages();
};

const timeout = 90000

const logsErrorLevels = async (logger: CategoryLogger | Category) => {
  logger.warning("warning1", new Error("warningex1"));
  logger.warning({msg: "warning2"}, new Error("ewarningex2"));
  logger.warning(() => "warning3", () => new Error("warningex3"));
  logger.warning(() => ({msg : "warning4"}), () => new Error("warningex4"));
  logger.warning(() => ({ msg: "warning5" }), () => new Error("warningex5"));

  logger.severe("severe1", new Error("severeex1"));
  logger.severe({msg: "severe2"}, new Error("severeex2"));
  logger.severe(() => "severe3", () => new Error("severeex3"));
  logger.severe(() => ({msg : "severe4"}), () => new Error("severeex4"));
  logger.severe(() => ({ msg: "severe5" }), () => new Error("severeex5"));

  logger.resolved("resolved1", new Error("resolvedex1"));
  logger.resolved({msg: "resolved2"}, new Error("resolvedex2"));
  logger.resolved(() => "resolved3", () => new Error("resolvedex3"));
  logger.resolved(() => ({msg : "resolved4"}), () => new Error("resolvedex4"));
  logger.resolved(() => ({ msg: "resolved5" }), () => new Error("resolvedex5"));

  logger.log(LogLevel.Severe, "random1", new Error("randomex1"));
  logger.log(LogLevel.Warning, { msg: "random2" }, new Error("randomex2"));
  logger.log(LogLevel.Severe, () => "random3", () => new Error("randomex3"));
  logger.log(LogLevel.Severe, () => ({msg : "random4"}), () => new Error("randomex4"));
  logger.log(LogLevel.Warning, () => ({ msg: "random5" }), () => new Error("randomex5"));
  const messages = getMessages(logger);

  return await waitForExpect(() => {
    expect(messages.length).toEqual(20);

    const result = getMessagesAsString(logger);

    expect(result).toContain("warning1");
    expect(result).toContain("warningex1");
    expect(result).toContain("warning2");
    expect(result).toContain("warningex2");
    expect(result).toContain("warning3");
    expect(result).toContain("warningex3");
    expect(result).toContain("warning4");
    expect(result).toContain("warningex4");
    expect(result).toContain("warning5");
    expect(result).toContain("warningex5");

    expect(result).toContain("severe1");
    expect(result).toContain("severeex1");
    expect(result).toContain("severe2");
    expect(result).toContain("severeex2");
    expect(result).toContain("severe3");
    expect(result).toContain("severeex3");
    expect(result).toContain("severe4");
    expect(result).toContain("severeex4");
    expect(result).toContain("severe5");
    expect(result).toContain("severeex5");

    expect(result).toContain("resolved1");
    expect(result).toContain("resolvedex1");
    expect(result).toContain("resolved2");
    expect(result).toContain("resolvedex2");
    expect(result).toContain("resolved3");
    expect(result).toContain("resolvedex3");
    expect(result).toContain("resolved4");
    expect(result).toContain("resolvedex4");
    expect(result).toContain("resolved5");
    expect(result).toContain("resolvedex5");

    expect(result).toContain("random1");
    expect(result).toContain("randomex1");
    expect(result).toContain("random2");
    expect(result).toContain("randomex2");
    expect(result).toContain("random3");
    expect(result).toContain("randomex3");
    expect(result).toContain("random4");
    expect(result).toContain("randomex4");
    expect(result).toContain("random5");
    expect(result).toContain("randomex5");
  });
};

const logsAllLevels = async (logger: CategoryLogger | Category) => {
  logger.finest("finest1");
  logger.finest({ msg: "finest2" });
  logger.finest(() => "finest3");
  logger.finest(() => ({msg: "finest4" }) );
  logger.finest(() => ({ msg: "finest5", data: "x" }));

  logger.finer("finer1");
  logger.finer({ msg: "finer2" });
  logger.finer(() => "finer3");
  logger.finer(() => ({msg: "finer4" }) );
  logger.finer(() => ({ msg: "finer5" }));

  logger.fine("fine1");
  logger.fine({ msg: "fine2" });
  logger.fine(() => "fine3");
  logger.fine(() => ({msg: "fine4" }) );
  logger.fine(() => ({ msg: "fine5" }));

  logger.info("info1");
  logger.info({ msg: "info2" });
  logger.info(() => "info3");
  logger.info(() => ({msg: "info4" }) );
  logger.info(() => ({ msg: "info5" }));

  logger.config("config1");
  logger.config({ msg: "config2" });
  logger.config(() => "config3");
  logger.config(() => ({msg: "config4" }) );
  logger.config(() => ({ msg: "config5" }));

  const messages = getMessages(logger);

  return await waitForExpect(() => {
    // expect(messages.length).toEqual(40);

    const result = getMessagesAsString(logger);

    expect(result).toContain("finest1");
    expect(result).toContain("finest2");
    expect(result).toContain("finest3");
    expect(result).toContain("finest4");
    expect(result).toContain("finest5");

    expect(result).toContain("finer1");
    expect(result).toContain("finer2");
    expect(result).toContain("finer3");
    expect(result).toContain("finer4");
    expect(result).toContain("finer5");

    expect(result).toContain("fine1");
    expect(result).toContain("fine2");
    expect(result).toContain("fine3");
    expect(result).toContain("fine4");
    expect(result).toContain("fine5");

    expect(result).toContain("info1");
    expect(result).toContain("info2");
    expect(result).toContain("info3");
    expect(result).toContain("info4");
    expect(result).toContain("info5");
  });
};

describe("CategoryLogger...", () => {

  let catRoot: Category;
  let catChild1: Category;
  let catChild2: Category;

  beforeEach(() => {
    CategoryServiceFactory.clear();
    catRoot = new Category("root");
    catChild1 = new Category("child1", catRoot);
    catChild2 = new Category("child2", catRoot);
  });

  afterEach(() => {
    CategoryServiceFactory.clear();
  });

  it("Default logs to error", () => {
    // Need to switch to messagebuffer for testing, by default or it will go to console.
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Severe, LoggerType.MessageBuffer));

    const logger = CategoryServiceFactory.getLogger(catRoot);
    logger.finest("Finest", catRoot);
    logger.finer("Fine", catRoot);
    logger.info("Info", catRoot);
    logger.warning("Warning", null, catRoot);
    logger.severe("Severe", null, catRoot);

    let msg = getMessagesAsString(logger);
    expect(msg).not.toContain("[root] Finest");
    expect(msg).not.toContain("[root] Finer");
    expect(msg).not.toContain("[root] Fine");
    expect(msg).not.toContain("[root] Config");
    expect(msg).not.toContain("[root] Info");
    expect(msg).not.toContain("[root] Warning");
    expect(msg).toContain("[root] Severe");

    logger.severe("Severe", null, catRoot);
    msg = getMessagesAsString(logger);
    expect(msg).toContain("[root] Severe");
  });

  it("Logs to different levels", () => {
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Finest, LoggerType.MessageBuffer));

    const logger = CategoryServiceFactory.getLogger(catRoot);
    logger.finest("Finest", catRoot);
    logger.finer("Finer", catRoot);
    logger.fine("Fine", catRoot);
    logger.config("Config", catRoot);
    logger.info("Info", catRoot);
    logger.warning("Warning", null, catRoot);
    logger.severe("Severe", null, catRoot);

    const messages = getMessages(logger);
    expect(messages.length).toEqual(7);
    expect(messages[0]).toContain("[root] Finest");
    expect(messages[1]).toContain("[root] Finer");
    expect(messages[2]).toContain("[root] Fine");
    expect(messages[3]).toContain("[root] Config");
    expect(messages[4]).toContain("[root] Info");
    expect(messages[5]).toContain("[root] Warning");
    expect(messages[6]).toContain("[root] Severe");
  });

  it("Logs to root category by default", () => {
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Finest, LoggerType.MessageBuffer));
    const logger = CategoryServiceFactory.getLogger(catRoot);

    logger.info("Hello");
    const messages = getMessages(logger);
    expect(messages.length).toEqual(1);
    expect(messages[0]).toContain("[root] Hello");
  });

  it("Logs to different levels", () => {
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info, LoggerType.MessageBuffer));
    const logger = CategoryServiceFactory.getLogger(catRoot);
    logger.info(() => "Dance", catRoot);
    const messages = getMessages(logger);
    expect(messages.length).toEqual(1);
    expect(messages[0]).toContain("[root] Dance");
  });

  it("Category log picks up changes", () => {
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info, LoggerType.MessageBuffer));
    const catSome = new Category("catSome");
    const catAnother = new Category("catAnother", catSome);

    catSome.info("info");
    catSome.finest("finest");
    catAnother.info("info");
    catAnother.finest("finest");

    let messages = getMessages(catSome);
    expect(messages.length).toEqual(1);
    expect(messages[0]).toContain("info");

    messages = getMessages(catAnother);
    expect(messages.length).toEqual(1);
    expect(messages[0]).toContain("info");

    CategoryServiceFactory.setConfigurationCategory(new CategoryConfiguration(LogLevel.Finest, LoggerType.MessageBuffer), catSome, true);
    catSome.info("info1");
    catSome.finest("finest1");
    messages = getMessages(catSome);
    expect(messages.length).toEqual(2);
    expect(messages[0]).toContain("info1");
    expect(messages[1]).toContain("finest1");

    catAnother.info("info1");
    catAnother.finest("finest1");
    messages = getMessages(catSome);
    expect(messages.length).toEqual(2);
    expect(messages[0]).toContain("info1");
    expect(messages[1]).toContain("finest1");
  });

  it("Category can log to multiple categories", () => {
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info, LoggerType.MessageBuffer));
    const catService = new Category("service");
    const catSome = new Category("catSome");
    const catAnother = new Category("catAnother", catSome);

    catAnother.info("info", catService, catSome);

    const messages = getMessages(catAnother);
    expect(messages.length).toEqual(1);
    expect(messages[0]).toContain("info");
    expect(messages[0]).toContain("[catAnother, service, catSome]");
  });

  describe("LogData", () => {
    const data = {key: "data"};
    const msg = "Message";
    let logger: CategoryLogger;

    beforeEach(() => {
      // Need to switch to messagebuffer for testing, by default or it will go to console.
      CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Finest, LoggerType.MessageBuffer));

      logger = CategoryServiceFactory.getLogger(catRoot);
    });

    it("Can handle LogData with custom ds", () => {
      logger.info({msg, data, ds: (d: any) => "hello " + d.key}, catRoot);

      const messages: string[] = getMessages(logger);
      expect(messages.length).toEqual(1);
      expect(messages[0]).toContain(msg + " [data]: hello " + data.key);
    });

    it("Can handle LogData without custom ds", () => {
      logger.info({msg, data}, catRoot);

      const messages: string[] = getMessages(logger);
      expect(messages.length).toEqual(1);
      expect(messages[0]).toContain(msg + " [data]: " + JSON.stringify(data));
    });

    it("Can handle LogData without custom ds and only message", () => {
      logger.info({msg}, catRoot);

      const messages: string[] = getMessages(logger);
      expect(messages.length).toEqual(1);
      expect(messages[0]).toContain(msg);
    });

    it("Test we do not bail on invalid error object", async () => {
      CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info, LoggerType.MessageBuffer));

      // Invalid error passsed in, this case a literal object. We should not bail out.
      const invalidError = { invalid : "bla" };
      catRoot.severe("Failed1", invalidError as any);

      // Next invalid error, but cannot be stringified either. We should not bail out.
      const anotherInvalidError = new InvalidError();
      anotherInvalidError.setSelf(anotherInvalidError);

      catRoot.severe("Failed2", anotherInvalidError as any);

      const messages = getMessages(logger);
      return await waitForExpect(() => {
        expect(messages.length).toEqual(2);
        expect(messages[0]).toContain("Unexpected error object was passed in. Could not resolve it, stringified object: {\"invalid\":\"bla\"}");
        expect(messages[1]).toContain("Unexpected error object was passed in. Could not resolve it or stringify it");
      });
    });
  });

  describe("Normal log methods support normal parameters and lambdas", () => {

    let logger: CategoryLogger;

    beforeEach(() => {
      // Need to switch to messagebuffer for testing, by default or it will go to console.
      CategoryServiceFactory.clear();
      CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Finest, LoggerType.MessageBuffer));
    });

    it("Tests all log levels", async () => {
      logger = CategoryServiceFactory.getLogger(catRoot);
      return logsAllLevels(logger);
    }, timeout);

    it("Tests all error log levels", async () => {
      logger = CategoryServiceFactory.getLogger(catRoot);
      return logsErrorLevels(logger);
    }, timeout);

    it("Tests all log levels when using category directly", async () => {
      return logsAllLevels(catRoot);
    }, timeout);

    it("Tests all error log levels when using category directly", async () => {
      return logsErrorLevels(catRoot);
    }, timeout);

    it("Doesn't matter which one to use", () => {
      catRoot.info("Bla1");
      logger = CategoryServiceFactory.getLogger(catRoot);
      logger.info("Bla2");

      const fromLogger = getMessages(logger);
      const fromCategory = getMessages(catRoot);

      expect(fromLogger.length).toEqual(2);
      expect(fromCategory.length).toEqual(2);
    }, 10000);
  });
});

class InvalidError {

  private _self!: InvalidError;

  public setSelf(self: InvalidError) {
    this._self = self;
  }
}
