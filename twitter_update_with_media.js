/**
 * Simple module for uploading media on Twitter
 */

(function() {
  var fs, path, request, twitter_update_with_media;
 
  fs = require('fs');
 
  path = require('path');
 
  request = require('request');
  /*
   * @public
   * @param {JSON} auth_settings
   */
  twitter_update_with_media = (function() {
    function twitter_update_with_media(auth_settings) {
      this.auth_settings = auth_settings;
      this.api_url = 'https://api.twitter.com/1.1/statuses/update_with_media.json';
    }
    
    /*
     * @private
     * @param {String} status tweet message
     * @param {String} file_path media path
     */
    twitter_update_with_media.prototype.post = function(status, file_path, callback) {
      var form, r;
      r = request.post(this.api_url, {
        oauth: this.auth_settings
      }, callback);
      form = r.form();
      form.append('status', status);
      return form.append('media[]', fs.createReadStream(path.normalize(file_path)));
    };
 
    return twitter_update_with_media;
 
  })();
 
  module.exports = twitter_update_with_media;
 
}).call(this);