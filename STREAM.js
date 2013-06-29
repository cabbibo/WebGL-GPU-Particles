var musicContext = new webkitAudioContext();
var masterGain = musicContext.createGainNode();
masterGain.connect(musicContext.destination);


STREAM.prototype = {


          //creates the HTML audio tag object
          createAudio:function (){ 

            var audio = new Audio();
            audio.preload = "none";
            audio.src = this.file;
            audio.loop = true;
            this.audio=audio;
          
          },


          //Creates a webkit Audio Source,
          //connecting it through an analyser 
          //to the masterGain
          createSource:function() {

            if(this.audio){ 

              this.source = musicContext.createMediaElementSource(this.audio);
              
              this.analyser = musicContext.createAnalyser();
              this.analyser.fftSize= frequencyBinCount * 2;
              console.log(this.analyser);

              this.source.connect(this.analyser)
              this.analyser.connect(masterGain)
           
            }else{
            
            }

          },
          
          start:function(){
                  
            //if the source hasn't been created yet,
            //create it!
            this.createAudio();	

            var self = this	
          
            //doing tiny timeout or for some reason
            // song won't play.. TODO: Investigate
            setTimeout(function(){
              if(!self.source){
                  self.createSource();
                  self.audio.play();
                  
              }else{
               
                  self.audio.play();
              }
            },10)

          },


          //Not using in this specific demo,
          //but is useful!
          stop:function(){		
            this.audio.pause();
            this.destroySource();	
          },
          
          play:function(){
            this.audio.play();
          },
          
          //Destroys the Audio Source,
          //Making sure to disconnect all the nodes
          //Again, not using for this specific demo
          //But still useful
          destroySource:function(){

            if(this.analyser){
              this.analyser.disconnect(masterGain)
            }

            
            if(this.source){
              this.source.disconnect(this.analyser)
            }	
          
            this.source = undefined
            this.panner = undefined
            this.analyser = undefined
            this.audio = undefined
          },
            
        }


        function STREAM (file){
          this.file=file
        }
            
