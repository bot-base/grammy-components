import WebApp from "@grammyjs/web-app";

interface Options {
  callback?: string;
}

export const sendResult = async (data: any, options?: Options) => {
  const { callback } = options || {};

  if (typeof callback === "string") {
    WebApp.MainButton.showProgress();

    try {
      await fetch(callback, {
        method: "POST",
        body: JSON.stringify({
          initData: WebApp.initData,
          data,
        }),
      });
      WebApp.close();
    } catch (err) {
      console.error(err);
    } finally {
      WebApp.MainButton.hideProgress();
    }
  } else {
    WebApp.sendData(JSON.stringify(data));
  }
};
