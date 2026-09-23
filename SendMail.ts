import { Configuration, SendApi, type V1SendRequest } from 'hostinger-mail-api-sdk';


const configuration = new Configuration({
  accessToken: "77b658ef264c96664911cfc7eb80b03cbaec5129f9862bf312738f5a16944991",
});

const request = {} as V1SendRequest;
request.to = ["steven.maslyk@gmail.com"];
request.subject = "test subject";
request.text = "hello there";
request.displayName ="Veteran John Outreach";


const sender = new SendApi(configuration);
sender.sendEmail("ACce658e8d7dacff61a5bbc14d22c2",request);

