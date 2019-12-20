import {Category} from "../src/logging/log/category/Category";
import {LoggerType, LogLevel} from "../src/logging/log/LoggerOptions";
import {CategoryMessageBufferLoggerImpl} from "../src/logging/log/category/CategoryMessageBufferImpl";
import {CategoryDelegateLoggerImpl} from "../src/logging/log/category/CategoryDelegateLoggerImpl";
import {CategoryConfiguration} from "../src/logging/log/category/CategoryConfiguration";
import {CategoryServiceFactory} from "../src/logging/log/category/CategoryServiceFactory";

const getMessagesAsString = (category: Category): string => {
  const logger = CategoryServiceFactory.getLogger(category);
  expect(logger instanceof CategoryDelegateLoggerImpl).toBeTruthy();
  const actualLogger = (logger as CategoryDelegateLoggerImpl).delegate;
  expect(actualLogger instanceof CategoryMessageBufferLoggerImpl).toBeTruthy();
  return (actualLogger as CategoryMessageBufferLoggerImpl).toString();
};

describe("Logging by Category...", () => {

  beforeEach(() => {
    CategoryServiceFactory.clear();
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Severe, LoggerType.MessageBuffer));
  });

  it("Can log root category (to error)", () => {
    const cat = new Category("root");
    cat.severe("Severe", null);

    expect(getMessagesAsString(cat)).toContain("Severe");
  });

  it("Can log child category (to error)", () => {
    const catChild = new Category("child", new Category("root"));
    catChild.severe("Severe", null);

    expect(getMessagesAsString(catChild)).toContain("Severe");
  });

});
