package pos;
import java.util.*;

public class PosController {
	private EmergencySensor eme;
	private PresenceSensor cardSense;
	private Actuator act;
	private PosSensor posSense;
	
	public PosController() {
		this.eme=new EmergencySensor();
		this.cardSense=new PresenceSensor();
		this.act=new PhysicalPos();
		this.posSense=(PosSensor)this.act;
	}

	public void openPos() {
		if(this.cardSense.getState() == true) {
			if(this.posSense.getposState() == 0) this.act.openPosMove();
			else System.out.println("The reader is already opened, so you can't open again.\n");
		}
		else System.out.println("You should put the card on the reader.\n");
	}
	public void closePos() {
		if(this.posSense.getposState() == 1) this.act.closePosMove();
			
		else System.out.println("The reader is already closed, so you can't close again.\n");
		
	}
	
	public void process() {
		for(int i=0; i<10; i++) {
			System.out.println("Here is the "+i+" customer\n");
			Scanner scan = new Scanner(System.in);
			
			while(this.cardSense.getState() == true) {
				System.out.println("Remove the card!!!!! \n y/n");
				String f=scan.next();
				while(f.equals("n")) {
					System.out.println("Remove the card!!!!! Input y!!!\n");
					f=scan.next();
				}
				this.cardSense.noPresenceSignal();
			}
			if(this.cardSense.getState() == false) {
				System.out.println("Do you want to put your card on the reader? y/n \n");
				String a=scan.next();
				if(a.equals("y") && this.cardSense.getState() == false) this.cardSense.presenceSignal();
			}
			System.out.println("Do you want to declare the emergencyState y/n ?\n");
			String b=scan.next();
			if(b.equals("y")) this.eme.emergencySignal();
			else this.eme.offEmergency();
			
			
			if (this.cardSense.getState() == true) {
				if(this.eme.getState() == false) {
					this.openPos();
					System.out.println("Now we simulate the controller open the reader of the pos again when the reader is already open \n");
					this.openPos();
					
					System.out.println("Is there an emergency ? y/n \n");
					String c=scan.next();
					
					System.out.println("Reading card,in the process \n");
					if(c.equals("y") ){
						this.eme.emergencySignal();
						this.closePos();
						System.out.println("Now we simulate the controller close the reader of the pos again when the reader is already closed \n");
						this.closePos();
					}
					else System.out.println("reading complete!");
				}
				else System.out.println("Emergency, the pos can't be opened because of the emergency \n");
				
				System.out.println("Do you want to remove the card from the reader? y/n \n");
				String d=scan.next();
				if(d.equals("y")) this.cardSense.noPresenceSignal();
				this.closePos();
				System.out.println("Now we simulate the controller close the reader of the pos again when the reader is already closed \n");
				this.closePos();
			}
			else System.out.println("You should put something on the reader, this turn is useless! \n");
			
		}
	}
}

