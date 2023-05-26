package lo02xu;
import java.util.*;

public class Offensive implements Strategie{
private String strategie;
private int indexStrategie;
public Offensive() {
	this.strategie="Offensive";
	this.indexStrategie=0;
}
public String getStrategie() {
	return this.strategie;
}
public int getIndexStrategie() {
	return this.indexStrategie;
}


public void combat(Etudiant attaquant) {		
	Zone zoneCurrent=attaquant.getZone();
	ArrayList<Etudiant> listEtu=zoneCurrent.getListEtu();
	listEtu.sort(Etudiant.comparatorEcts);
	Etudiant attaque=listEtu.get(0);
	int i=1;
	while(attaque.getJoueur() == attaquant.getJoueur() || attaque.isReserviste()==true) {
		attaque=listEtu.get(i);
		i++;
	}
	
	Random random=new Random();
	int x=random.nextInt(101);
	double y=random.nextDouble();
	if(x >= 0 && x <= 40+3*attaquant.getDexterite()) {
		int coefDegat=Math.max(0, Math.min(100, 10*attaquant.getForce()-5*attaque.getResistance()));
		int degat =(int)(Math.floor(y*(1+coefDegat)*10));
		if(attaquant.getEcts()>0 && attaque.getEcts()>0 && attaquant.isReserviste() == false) {
			if(degat < attaque.getEcts()) {
				attaque.setEcts(attaque.getEcts()-degat);
				System.out.println("etudiant "+attaquant.getNumEtu()+" a effectue "+degat+" a l'edu "+attaque.getNumEtu()+"\n");
			}
			else {
				System.out.printf("etudiant "+attaquant.getNumEtu()+" a tue etu "+attaque.getNumEtu()+"\n");
				listEtu.remove(attaque);
			}
		}
		
	}
	else System.out.println("L'attaquant etu "+attaquant.getNumEtu()+" a echoue l'attaque\n");
	}
	

}
