package pos;

public class PhysicalPos implements Actuator,PosSensor{
	private int posState;
	
	public PhysicalPos() {
		this.posState=0;
	}
	
	public void openPosMove(){
		System.out.println("the pos is opened!\n");
		this.posState=1;
	}
	
	public void closePosMove(){
		System.out.println("the pos is closed!\n");
		this.posState=0;
	}
	
	public int getposState() {
		return this.posState;
	}
}
