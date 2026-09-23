import { AccountApi, Configuration } from 'hostinger-mail-api-sdk';


const configuration = new Configuration({
  accessToken: "77b658ef264c96664911cfc7eb80b03cbaec5129f9862bf312738f5a16944991",
});



const account = new AccountApi(configuration);

const { data } = await account.getCurrentAccount();

for (const mailbox of data.data.mailboxes) {
  console.log(mailbox.resourceId, mailbox.address);
}