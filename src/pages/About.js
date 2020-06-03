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
        <h2 className="paragraph-heading">Covid Recovery Tracker uses data from worldometer to show how close to healing we are</h2>
        <p>
          Covid19 is on almost everybody's mind right now and most of the data is pretty hard to analyze from an optimistic perspective
          This is aimed at aggregating data from
          <a href="https://www.worldometers.info/coronavirus" className="external-link">worldometer/covid</a>
          and sort it by a <em>percent recovered</em> metric. This particular one is currently missing from worldometer and you you may have found out,
          as I did, that total deaths only goes up and it is not very useful to track those unless you
          <a href="https://aatishb.com/covidtrends/" className="external-link">log scale them</a>.
        </p>
        <p>
          On the other hand, having a big percent of recovered people should be an indicator of herd immunity (long lasting or not so much)
          and an optimistic metric of the covid19 situation worldwide.
        </p>
        <p>
          Of course, the accuracy of the metric very much depends on how each country monitors and reports data, especially the <em>Total Recovered</em> indicator.
          A lot of countries consider what they don't know as recovered. Others don't report anything for the recovered value; in this case
          recovered is computed as Total Cases - Total Deaths - Active Cases. Some countries don't report Active Cases; in this case an average value
          of active cases is deduced based on the data from countries that report it.
          This page is not opinionated about what and how countries report.
          I am merely mention this as a caveat in assuming a high correlation between
          these numbers and the in the field situation.
        </p>

        <h2 className="paragraph-heading">Contact</h2>
        <p>
          The source code for this web app is on
          <a href="https://github.com/danbaragan/covid-recovery" className="external-link">github</a>
          Since this page is scraping data from worlometer/covid html, things might break every once in a while when they change their page layout.
          Feel free to open an issue on github if this happens.
        </p>
        <p>You can otherwise find me on <a href="https://twitter.com/dan_baragan" className="external-link">twitter</a>
          and <a href="https://www.instagram.com/daniel.mihai.baragan/" className="external-link">instagram</a>
        </p>

      </div>
    </>
  )
}

export default About
