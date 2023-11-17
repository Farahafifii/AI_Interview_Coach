import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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" // Change wiht ours
});

const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Hello!"}],
  });
  console.log(chatCompletion.choices[0].message);