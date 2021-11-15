## This is the site for the **Queer Kahani** podcast

The site has been built using Jekyll. Individual posts for each episode power the RSS for Subscriptions via iTunes. Episodes can also be streamed using the html5 audio media player. 

The site design was based on [Jekyll Skeleton](https://github.com/timklapdor/jekyll-skeleton) by Tim Klapdor. 

# Notes
- use jekyll build in the directory with the Gemfile to build (not serve)
- update relative path and URL in Gemfile - this will be different for local file-based testing vs. on the server. jekyll serve is a different option?
- separate pages are in _pages, see permalink field for what their page file will be
- _layouts contains key templates for all pages. header.html is used everywhere
- debugging css location. see _includes/head.html, link rel="stylesheet"
- post.html - we may have to give up on plyr :/ jsut audio control is ok. see plyr-test.html. Plyr docs are here https://github.com/sampotts/plyr
- index.html - contains grid of episodes
- grid of episodes in index.html is defined in podsrc/_sass/modules/_cards.scss - currently set for 1 column, 2 and 3 column layouts are possible
- navigation css is in podsrc/_sass/modules/_navigation.scss
- all the header CSS nonsense is in podsrc/_sass/base/_structure.scss , in particular .header and .logo
- queer kahani background color is #B7B3FD
- card CSS is controlled by global variables in podsrc\_sass\base\_variables.scss and card-specific stuff in podsrc\_sass\modules\_cards.scss

# To Do Before Launch
- fix favicon and update podsrc\_includes\head.html
- update metadata and files for epsiodes 1 and 2
- remove plyr_test.html from build

# To Do After Spotify/Apple Music Listing
- update navigation.html
- update footer.html
