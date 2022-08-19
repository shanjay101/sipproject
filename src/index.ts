import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";

// Helper function to get an HTML audio element
function getAudioElement(id: string): HTMLAudioElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAudioElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

// Helper function to wait
async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Main function
async function main(): Promise<void> {


  const server = "wss://3frontoffice.nr.tre.se";

  //const destination = "sip:+923235037548@3kontaktpartnernr.dk";
  const destination = "sip:00923235037548@3kontaktpartnernr.dk";

  const aor = "sip:device.a23995751@3kontaktpartnernr.dk";

  const authorizationUsername = "device.a23995751";
  
  const authorizationPassword = "Arooj123";


const options: SimpleUserOptions = {
    aor,
    media: {
      remote: {
        audio: getAudioElement("remoteAudio")
      }
    },
    userAgentOptions: {
      authorizationPassword,
      authorizationUsername
    }
  };

  // Construct a SimpleUser instance
  const simpleUser = new SimpleUser(server, options);

  // Supply delegate to handle inbound calls (optional)
  simpleUser.delegate = {
    onCallReceived: async () => {
      await simpleUser.answer();
    }
  };

  try {
     // Connect to server
    await simpleUser.connect();
    
  // Register to receive inbound calls (optional)
    await simpleUser.register();

  // Place call to the destination
  await simpleUser.call(destination);

  } catch (error) {
    console.log("________error")
    console.log(error)
    
  }
 
  

  // Wait some number of milliseconds
  //await wait(5000);

  // Hangup call
  //await simpleUser.hangup();
}

// Run it
main()
  .then(() => console.log(`Success`))
  .catch((error: Error) => console.error(`Failure`, error));
  
