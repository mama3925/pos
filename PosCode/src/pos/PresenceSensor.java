package pos;

public class PresenceSensor {
	private boolean presenceState;
	
	public PresenceSensor() {
		this.presenceState=false; 
		
	}
	
	public void presenceSignal() {
		System.out.println("The card is on the reader");
		this.presenceState=true;
	}
	public void noPresenceSignal() {
		System.out.println("Now you remove the card from the reader");
		this.presenceState=false;
	}
	
	public boolean getState() {
		return this.presenceState;
	}
}
