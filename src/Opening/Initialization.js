
import {useEffect} from 'react'
import axios from 'axios';

import firebase from '../firebaseApp'

const InitializationComp = () => 
{

  useEffect(async () =>
  {

    let resp = await axios.get("https://api.tvmaze.com/shows");
    let allMovies = resp.data;

    console.log(allMovies)

    allMovies.forEach(movie => {

      movie.subscriptions = [];

      firebase.firestore().collection('Movies').add(movie)
      
    });

    let resp2 = await axios.get("https://jsonplaceholder.typicode.com/users");
    let allMembers = resp2.data

    allMembers.forEach(member => {

      member.moviesSubscribed = [];

      firebase.firestore().collection('Members').add(member)
      
    });

    let sysAdminUser = {"name" : "sysAdmin", "userName" : "sysAdmin", "password" : "SysAdmin135",
                       "sessionTimeOut" : "1000", "createdDate" : "2000-00-00",
                        "stringPermissions" : ["View Subscription ", "Create Subscription ", "Delete Subscription ", "Update Subscription ",
                                                "View Movies ", "Create Movies ", "Delete Movies ", "update Movies"],
                        "booleansPermissions" : [true, true, true, true, true, true, true, true]};

    firebase.firestore().collection('Users').add(sysAdminUser)

  },[])

  return (
    null
  );
}

export default InitializationComp;
