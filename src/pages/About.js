import React from 'react';
import { Helmet } from 'react-helmet'


function About() {
  return (
    <>
      <Helmet>
        <title>Covid Recovery Tracker: About</title>
        <meta name="description" content="Covid Recovery Tracker uses data from Johns Hopkins / worldometer to show how close to healing we are"/>
      </Helmet>

      <div className="container layout-mid text-lg py-6 pb-10">
        <h2 className="paragraph-heading">Covid Recovery Tracker uses data from Johns Hopkins / worldometer to show how close to healing we are</h2>
        <p>
          Covid19 is on almost everybody's mind right now and most of the data is pretty hard to analyze from an optimistic perspective.
          I use data from <a href="https://covid-api.com" className="external-link" target="_blank" rel="noopener noreferrer">Johns Hopkins</a> or
          {' '}<a href="https://www.worldometers.info/coronavirus" className="external-link" target="_blank" rel="noopener noreferrer">worldometer/covid</a>
          {' '}and sort it by a <em>percent recovered</em> metric. This particular one missing from other sources and you you may have found out,
          as I did, that total deaths only goes up and it is not very useful to track those unless you
          {' '}<a href="https://aatishb.com/covidtrends/" className="external-link" target="_blank" rel="noopener noreferrer">log scale them</a>.
        </p>
        <p>
          On the other hand, having a big percent of recovered people should be an indicator of herd immunity (long lasting or not so much)
          and an optimistic metric of the covid19 situation worldwide. The <em>percent recovered</em> is the fraction of <em>recovered</em> /
          (<em>total cases</em> - <em>deaths</em>).
        </p>
        <p>
          Of course, the accuracy of the metric very much depends on how each country monitors and reports data, especially the <em>Total Recovered</em> indicator.
          A lot of countries consider what they don't know as already recovered. Others don't report anything for the recovered value
          essentially saying that no one is recovered from covid until they have good criteria for that determination; in this case
          I compute recovered as Total Cases - Total Deaths - Active Cases. Some countries don't report Active Cases value as well;
          in this case an average value of active cases is estimated based on the data from countries that report it.
          For this last case an <em>*</em> is added the country name.
          This page is not opinionated about what and how countries report. I am merely mentioning this as a caveat in assuming a high correlation between
          these numbers and the in field situation.
        </p>

        <h2 className="paragraph-heading">Contact</h2>
        <p>
          The source code for this web app is on
          {' '}<a href="https://github.com/danbaragan/covid-recovery" className="external-link" target="_blank" rel="noopener noreferrer">github</a>
          {' '}Since this page is scraping data from worlometer/covid html, things might break every once in a while when they change their page layout.
          Feel free to open an issue on github if this happens.
        </p>
        <p>You can otherwise find <a href="https://danbaragan.github.io/" className="external-link" target="_blank" rel="noopener noreferrer">me</a> on
          {' '}<a href="https://twitter.com/dan_baragan" className="external-link" target="_blank" rel="noopener noreferrer">twitter</a> and
          {' '}<a href="https://www.instagram.com/daniel.mihai.baragan/" className="external-link" target="_blank" rel="noopener noreferrer">instagram</a>.
        </p>

      </div>
    </>
  )
}

export default About
