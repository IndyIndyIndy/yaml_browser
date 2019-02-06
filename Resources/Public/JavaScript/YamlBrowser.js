/***
 *
 * This file is part of the "YamlBrowser" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2019 Christian Eßl <indy.essl@gmail.com>, https://christianessl.at
 *
 ***/

define(["jquery", "jquery.fancytree", "jquery.fancytree.filter"], function($) {
    "use strict";

    var YamlBrowser = {
        $yamlTree: null,
        $searchInput: null,
        $resetButton: null,
        $matchesContainer: null,

        configuration: null,
        searchTimeout: null,
        searchTimeoutDelay: 500,
        matchesText: ''
    };
    var self = YamlBrowser;

    /**
     * Initialize the yaml browser
     *
     * @param {string} configurationJson
     * @param {string} matchesText
     */
    YamlBrowser.init = function (configurationJson, matchesText) {
        self.loadTreeConfiguration(configurationJson);

        self.$yamlTree = $('#yaml-tree');
        self.$searchInput = $('#yaml-search');
        self.$resetButton = $('#reset-search');
        self.$matchesContainer = $('#matches');
        self.matchesText = matchesText;

        self.initTree();
        self.initSearch();
        self.initResetButton();
    };

    /**
     * Load up the configuration
     *
     * @param {string} configurationJson
     */
    YamlBrowser.loadTreeConfiguration = function (configurationJson) {
        self.configuration = JSON.parse(configurationJson);
    };

    /**
     * The tree for displaying the yaml configuration
     */
    YamlBrowser.initTree = function () {
        self.$yamlTree.fancytree({
            escapeTitles: false,
            debugLevel: 0,
            extensions: ['filter'],
            quicksearch: true,
            icon: false,
            source: self.configuration,
            filter: {
                autoExpand: true,
                counter: true,
                fuzzy: false,
                hideExpandedCounter: true,
                hideExpanders: false,
                highlight: true,
                leavesOnly: false,
                nodata: true,
                mode: 'dimm'
            }
        });

        $(".fancytree-container").addClass("fancytree-connectors");
    };

    /**
     * The search input
     */
    YamlBrowser.initSearch = function () {
        self.$searchInput.on('keyup', function(event) {
            var searchValue = $(this).val();

            if (self.searchTimeout !== null) {
                clearTimeout(self.searchTimeout);
            }

            self.searchTimeout = setTimeout(function () {
                self.executeSearch(searchValue, event);
            }, self.searchTimeoutDelay);
        }).focus();
    };

    /**
     * @param {string} searchValue
     * @param {object} event
     */
    YamlBrowser.executeSearch = function (searchValue, event) {
        var tree = $.ui.fancytree.getTree();
        self.searchTimeout = null;

        if(event && event.which === $.ui.keyCode.ESCAPE || searchValue.trim() === "") {
            self.resetSearch();
        } else if (searchValue.length > 3) {
            var matches = null;

            if($("#yaml-regexsearch").is(":checked")) {
                matches = tree.filterNodes.call(tree, function(node) {
                    return new RegExp(searchValue, "i").test(node.title);
                });
            } else {
                matches = tree.filterNodes.call(tree, searchValue);
            }

            self.$matchesContainer.text(self.matchesText.replace('%s', matches));
        }
    };

    /**
     * Reset button
     */
    YamlBrowser.initResetButton = function () {
        self.$resetButton.on('click', function(e) {
            self.resetSearch();
            e.preventDefault();
        });
    };

    /**
     * Reset the search
     */
    YamlBrowser.resetSearch = function () {
        self.$searchInput.val('');
        self.$matchesContainer.text('');
        self.$yamlTree.fancytree('getTree').clearFilter();
    };

    return YamlBrowser;
});