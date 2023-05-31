package pos;

public class EmergencySensor {
	private boolean emergencyState;

	public EmergencySensor() {
	this.emergencyState=false;
	}
	
	public void emergencySignal() {
		System.out.println("Emergency! The pos will be closed to insure your safety!");
		this.emergencyState=true;
	}
	public void offEmergency() {
		this.emergencyState=false;
	}
	
	public boolean getState() {
		return this.emergencyState;
	}
}
