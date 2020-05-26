import React from 'react';
import { Helmet } from 'react-helmet'


function About() {
  return (
    <>
      <Helmet>
        <title>Covid Recovery Tracker: About</title>
        <meta name="description" content="Covid Recovery Tracker uses data from worldometer to show how close to healing we are"/>
      </Helmet>

      <div className="container layout-mid text-lg py-6 pb-10">
        <p>Covid Recovery Tracker uses data from worldometer to show how close to healing we are</p>
      </div>
    </>
  )
}

export default About
