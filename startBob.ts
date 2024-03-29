import {Bob_Start,Bob_End,executeProtocol, messages} from './Bob';
import {RES} from './Message';

async function protocol(s1:Bob_Start):Promise<Bob_End> {
  let nextState = await s1.recv();
  while ( true ){
    switch (nextState.messageType) {
      case messages.ADD: {
        console.log(`Received ${nextState.message.value1} and ${nextState.message.value2}`);
        const res = new RES( nextState.message.value1 + nextState.message.value2 );
        s1 = await nextState.send_RES_to_Alice(res);
        nextState = await s1.recv();
        break;
      }
      case messages.BYE:{
        const done = nextState;
        return new Promise( resolve => resolve(done) );
      }
    }
  }
}

async function start(){
   await executeProtocol(protocol,'localhost',30002);
}

start();