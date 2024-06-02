import { store } from "@/database/Firebase";

export let eventLength = 0;
export const fetchEventData = async() => {
   const eventData = [];
   const cardref = store.collection('cards');
   const data = await cardref.get();
   data.forEach(doc => {
       eventData.push({
           id:doc.id,
           ...doc.data()
       })
   })
   eventLength = eventData.length;
  return eventData;
}

const subscribeToEvents = () => {
    return store.collection("cards").onSnapshot((snapshot) => {
        // eventData.length = 0;
        const eventData = []
        snapshot.forEach((doc) => {
            eventData.push({
                id:doc.id,
                ...doc.data()    
            })
        })
        eventLength = eventData.length;
    })
}

// fetchEvents();


export const unsubscribe = subscribeToEvents();