#pragma strict
var lengthOfDaylight:double;
var lengthOfNight:double;
var lightobj:Light;
var currTime:double;
var startTime:double;
var isDaytime:boolean;
var rotationAxis:String;
private var origRot:Transform;
private var origInt:double;

function Start () {
	currTime=startTime;
	origRot=lightobj.transform;
	origInt=lightobj.intensity;
}

function Update () {
	if(isDaytime){
		if(currTime>lengthOfDaylight){
			currTime=0;
			isDaytime=false;
			lightobj.transform.Rotate(185,0,0);
			animation["sunset"].wrapMode=WrapMode.Once;
			//animation.Play();
			//lightobj.intensity=0;
		}else{
			if(currTime>lengthOfDaylight-animation["sunset"].length){
				animation["sunset"].speed=1.0;
				animation.Play();
			}
			lightobj.intensity=origInt;
			var val=170.0/lengthOfDaylight*Time.deltaTime;
			if(rotationAxis.ToLower() =="x"){
				lightobj.transform.Rotate(val,0,0);
			}else if(rotationAxis.ToLower() =="y"){
				lightobj.transform.Rotate(0,val,0);
			}else if(rotationAxis.ToLower() =="z"){
				lightobj.transform.Rotate(0,0,val);
				Debug.Log(transform.rotation.z+"|"+170.0/lengthOfDaylight+"|"+Time.deltaTime);
			}
		}
		currTime+=Time.deltaTime;
	}else{
		if(currTime>lengthOfNight){
			currTime=0;
			isDaytime=true;
			
		}else if(currTime>lengthOfNight-animation["sunset"].length){
				animation["sunset"].speed=-1.0;
				animation.Play();
		}
		currTime+=Time.deltaTime;
	}
}