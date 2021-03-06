#pragma strict
var isRigidbody:boolean;
var resourceManager:GameObject;
var metalValue:double;
var pickupRange:double;
var player:GameObject;

function Start(){
}
function separate(){
	resourceManager=GameObject.Find("_ResourceManager");
	var clone:GameObject=Instantiate(gameObject,gameObject.transform.position,gameObject.transform.rotation);
	clone.AddComponent("Rigidbody");
	clone.SendMessage("setIsClone",true,SendMessageOptions.RequireReceiver);
	Destroy(gameObject);
}

function Update(){
	if(!player){
		player=GameObject.Find("player");
	}
	if(Vector3.Distance(transform.position,player.transform.position)<=pickupRange && isRigidbody){
		//Debug.Log(transform.parent+"|"+transform.childCount);
		if(!transform.parent && transform.GetChildCount()==0){
			resourceManager.SendMessage("addMetal",metalValue,SendMessageOptions.RequireReceiver);
			Destroy(gameObject);
		}
	}
}
function setIsClone(val:boolean){
	isRigidbody=val;
	//Debug.Log("true");
}