var expect = chai.expect;
var assert = chai.assert;


describe('shm.youtube', function(){

	beforeEach(module('shm.youtube'));

	var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));


  describe('service - YoutubeAPI', function(){

    var YoutubeAPI;
    beforeEach(inject(function (_YoutubeAPI_) {
      YoutubeAPI = _YoutubeAPI_;
    }));

  
    describe('When loadBinary is called', function() {

      it('should call passed in callbacks', function (done) {
        var spy = chai.spy();
        var spy2 = chai.spy();
        YoutubeAPI.loadBinary(spy);
        YoutubeAPI.loadBinary(spy2);
        setTimeout(function() {
          expect(spy).to.have.been.called();
          expect(spy2).to.have.been.called();
          done();
        }, 1000)
      });

      it('should expose YT on global namespace', function() {
        assert(typeof window.YT, 'object');
      });

    });
    
  });


  describe('directive - youtube', function(){

  	describe('When video attribute is omitted', function() {
      it('should throw an error', inject(function ($compile) {
        element = angular.element('<youtube></youtube>');
        assert.throw($compile(element), Error)
      }));
    });

  });



});
