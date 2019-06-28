/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // RSS FEEDS TEST SUITE 
    describe('RSS Feeds', function() {
    
    // Ensures it has a URL defined and that the URL is not empty.
  

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         

         it('each has url', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.constructor).toBe(String);
                expect(feed.url.length).not.toBe(0);
            }
         });

    // Ensures it has a name defined and that name is not empty.

         it('each has name', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.constructor).toBe(String);
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    // MENU TEST SUITE  

    describe('The menu', function() {

        // Ensures that the menu element is hidden by default

         it('hidden by default', function() {
            let isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBe(true);
         });

         // Toogle view when icon is clicked

        it('toggles view when icon is clicked', function() {
            let menuIcon = document.querySelector('a.menu-icon-link');
            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList


    // "Initial Entries" TEST SUITE

    describe('Initial Entries', function() {


        beforeEach(function(done){
            loadFeed(1, done);
        });


        it('has entries in feed container', function() {
            let feedContainer = document.querySelector('div.feed');
            let entries = feedContainer.querySelectorAll('article.entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    }); // Source: https://jasmine.github.io/2.0/introduction.html

    // "New Feed Selection" TEST SUITE

    describe('New Feed Selection', function() {


        let firstFeed, secondFeed;

        beforeEach(function(done) {
            loadFeed(3, function() {
                firstFeed = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function() {
                    secondFeed = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });

        it('loads new feeds', function() {
            expect(firstFeed).not.toBe(secondFeed);
        });

    });
}());

        /* Begin Attribution

         * Referenced helper code from Udacity Mentor Carlos.
         * Referenced helper code from Udacity Student Leader Ryan Waite.

        End Attribution */
