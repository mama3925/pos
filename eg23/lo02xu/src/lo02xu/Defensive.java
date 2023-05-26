package lo02xu;

import java.util.*;

public class Defensive implements Strategie{
	private String strategie;
	private int indexStrategie;
	public Defensive() {
		this.strategie="Defensive";
		this.indexStrategie=1;
	}
	public String getStrategie() {
		return this.strategie;
	}
	public int getIndexStrategie() {
		return this.indexStrategie;
	}
	
	public void combat(Etudiant soignant) {
		Zone zoneCurrent=soignant.getZone();
		ArrayList <Etudiant> cureEtu=zoneCurrent.getListEtu();
		cureEtu.sort(Etudiant.comparatorEcts);
		Etudiant soigne=cureEtu.get(0);
		int i=1;
		
		
		while(soigne.getJoueur() == soignant.getJoueur() || soigne.isReserviste() == true) {
			soigne=cureEtu.get(i);
			i++;
		}
		
		int flag=0;
		Random random=new Random();
		int x=random.nextInt();
		double y=random.nextDouble();
		if(y > 0.6) y-=0.4;
		
		while(soignant.isReserviste() == false && soignant.getEcts() > 0 && soigne.getEcts()>0 && flag == 0) {
			if(soigne.getEcts() >= 30+soigne.getConstitution()) {
				i++;
			}
			else if(x >= 0 && x <= 20+6*soignant.getDexterite()) {
				int soin=(int)Math.floor(y*(10+soigne.getConstitution()));
				if(soin+soigne.getEcts() < 30+soigne.getConstitution()) {
					soigne.setEcts(soin+soigne.getEcts());
					System.out.println("etu "+soignant.getNumEtu()+" a soine "+soin+" a l'etu "+soigne.getNumEtu()+"\n");
					flag++;
				}
				else {
					soigne.setEcts(30+soigne.getConstitution());
					int soinReel=30+soigne.getConstitution()-soigne.getEcts();
					System.out.println("etu "+soignant.getNumEtu()+" a soine "+soinReel+" a l'etu "+soigne.getNumEtu()+"\n");
					flag++;
				}
			}
			else {
				System.out.println("Etu "+soignant.getNumEtu()+" a echoue le soin\n");
				flag++;
			}
		}
		
	}
}
