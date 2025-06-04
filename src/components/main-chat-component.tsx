import { useState, useRef, useEffect, FormEvent } from 'react';
import { Message } from '../types/message.tsx';

export const MainChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const mainChat = useRef(null);
  const [height, setHeight] = useState(0);

  const apiEndpoint = import.meta.env.VITE_AI_API_URL ?? 'http://localhost:11434/api/generate';
  const model = import.meta.env.VITE_AI_MODEL;

  useEffect(() => {
    setHeight((mainChat.current as any).scrollHeight);
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const messageElement = form.elements.namedItem('message') as HTMLTextAreaElement;
    const outputMessage = messageElement.value;

    if (!outputMessage.trim()) return;

    addMessage(outputMessage);
    fetchData(outputMessage);

    messageElement.value = '';
  };

  const fetchData = async (outputMessage: string) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          model: model,
          prompt: outputMessage,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = (response.body as any).getReader();
      let receivedData = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        receivedData += new TextDecoder().decode(value);
      }

      const receivedDataJSON = JSON.parse(receivedData).response.trim();

      setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          isAi: true,
          message: receivedDataJSON,
          timestamp: '2 min ago',
        },
      ]);

      setTimeout(() => {
        setHeight((mainChat.current as any).scrollHeight);
      }, 50);
    } catch (error) {
      const errorObject = error as Error;
      console.error(`Error: ${errorObject.message}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          isAi: true,
          message: `Sorry, I encountered an error: ${errorObject.message}`,
          timestamp: '2 min ago',
        },
      ]);

      setTimeout(() => {
        setHeight((mainChat.current as any).scrollHeight);
      }, 50);
    }
  };
  const addMessage = (message: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        isAi: false,
        message: message,
        timestamp: '2 min ago',
      },
    ]);

    setTimeout(() => {
      setHeight((mainChat.current as any).scrollHeight);
    }, 50);

    (mainChat.current as any).scrollTo({
      top: height,
      behavior: 'smooth',
    });
  };

  if (height) {
    (mainChat.current as any).scrollTo({
      top: height,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-w-xxl h-screen text-gray-800 p-10'>
        <div className='flex flex-col flex-grow w-full max-w-xxl text-black bg-gray-50 focus:outline-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-hidden'>
          <div
            ref={mainChat}
            className='flex flex-col overflow-y-scroll flex-grow h-0 p-4 overflow-auto'
          >
            {messages &&
              messages.map((message: Message) =>
                message.isAi ? (
                  <div
                    className='flex mt-2 space-x-3 max-h-screen w-full md:w-3/4'
                    key={message.id}
                  >
                    <div className='flex flex-shrink-0 h-10 w-10 rounded-full items-center justify-center bg-blue-300'>
                      AI
                    </div>
                    <div className='w-full'>
                      <div className='bg-gray-300 p-3 rounded-r-lg rounded-bl-lg w-full dark:text-black'>
                        <p className='text-sm text-start'>{message.message}</p>
                      </div>
                      <div className='text-start'>
                        <span className='text-xs text-gray-500 leading-none'>2 min ago</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex mt-2 space-x-3 w-full ml-auto justify-end' key={message.id}>
                    <div>
                      <div className='bg-blue-600 dark:bg-blue-800 text-white p-3 rounded-l-lg rounded-br-lg'>
                        <p className='text-sm text-start'>{message.message}</p>
                      </div>
                      <div className='text-end'>
                        <span className='text-xs text-gray-500 leading-none'>2 min ago</span>
                      </div>
                    </div>
                  </div>
                ),
              )}
          </div>
          <form onSubmit={submitHandler} className='w-full'>
            <div className='p-4 flex flex-col md:flex-row md:justify-between sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-11xl md:items-center'>
              <textarea
                id='message'
                name='message'
                rows={4}
                className='block min-h-20 mr-6 p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50  focus:outline-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Type your message...'
                autoComplete={'off'}
                autoCorrect={'off'}
                spellCheck={'false'}
              ></textarea>
              <button
                className='flex self-center justify-around items-center text-white my-3 bg-blue-400 w-2/4 md:w-2/8'
                type='submit'
              >
                Send
              </button>
            </div>
            {/*<label htmlFor='chat' className='sr-only'>*/}
            {/*  Your message*/}
            {/*</label>*/}
            {/*<div className='flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700'>*/}
            {/*  <textarea*/}
            {/*    id='chat'*/}
            {/*    rows={4}*/}
            {/*    className='block mx-4 p-2.5 w-full text-sm  resize-none text-gray-900 bg-white rounded-lg border focus:outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'*/}
            {/*    placeholder='Your message...'*/}
            {/*  ></textarea>*/}
            {/*  <button*/}
            {/*    type='submit'*/}
            {/*    className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'*/}
            {/*  >*/}
            {/*    <svg*/}
            {/*      className='w-5 h-5 rotate-90 rtl:-rotate-90'*/}
            {/*      aria-hidden='true'*/}
            {/*      xmlns='http://www.w3.org/2000/svg'*/}
            {/*      fill='currentColor'*/}
            {/*      viewBox='0 0 18 20'*/}
            {/*    >*/}
            {/*      <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />*/}
            {/*    </svg>*/}
            {/*    <span className='sr-only'>Send message</span>*/}
            {/*  </button>*/}
            {/*</div>*/}
          </form>
        </div>
      </div>
    </>
  );
};
