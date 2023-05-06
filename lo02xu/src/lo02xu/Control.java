package lo02xu;

import java.util.*;

public class Control {
private ArrayList<Joueur> joueurs;
private ArrayList<Zone> zones;

public Control() {
	this.joueurs=new ArrayList<Joueur>();
	this.zones=new ArrayList<Zone>();
	Zone zone0=new Zone(this);
	Zone zone1=new Zone(this);
	Zone zone2=new Zone(this);
	Zone zone3=new Zone(this);
	Zone zone4=new Zone(this);
	Joueur joueur1=new Joueur(1,this);
	Joueur joueur2=new Joueur(2,this);
}

public void init() {
	System.out.println("You should choose the filiere of the two players, please input twice, range 0-6");
	Scanner sc=new Scanner(System.in);
	this.joueurs.get(0).setFiliere(sc.nextInt());
	this.joueurs.get(1).setFiliere(sc.nextInt());
	
	this.joueurs.get(0).setReserviste();
	this.joueurs.get(1).setReserviste();
	
	
	for(Etudiant etu1 : this.joueurs.get(0).getListEtu()) {
		etu1.modifierDataEtu();
		etu1.choisirStrategie();
		etu1.placerZoneIni();
	}
	for(Etudiant etu2 : this.joueurs.get(1).getListEtu()) {
		etu2.modifierDataEtu();
		etu2.choisirStrategie();
		etu2.placerZoneIni();
	}
	
}



public void fight() {
	int drapeau=0;
	while(drapeau == 0) {
	for(Zone zone : this.zones) {
		if(zone.isControlee() == 0) {
			zone.getListEtu().sort(Etudiant.comparatorInitiative);
			Iterator<Etudiant> it=zone.getListEtu().iterator();
			int flag = 0;
			while(it.hasNext() && flag == 0) {
				Etudiant etu=(Etudiant)it.next();
				etu.combat();
				flag=zone.isControlee();
			}
			
			if(this.joueurs.get(0).getListZoneControlee().size() >= 3) {
				drapeau=1;
				break;
			}
			else if(this.joueurs.get(1).getListZoneControlee().size() >= 3) {
				drapeau=2;
				break;
			}
			
			else {
				if(flag == 1) {
					System.out.println("Now please let joueur "+flag+"to affect his students to other zones\n");
					treveWinner(zone,flag);
			}
				else if(flag == 2) {
					System.out.println("Now please let joueur "+flag+"to affect his students to other zones\n");
					treveWinner(zone,flag);
				}
			}
		}
	}
	}
	
}

public void treveWinner(Zone zone,int flag) {
	System.out.println("Now it's the treve, the winner should move his students\n");
	zone.afficherZone();
	int quantity=0;
	for(Etudiant et : zone.getListEtu()) {
		et.afficherEtu();
		quantity++;
	}
	System.out.println("You should choose a student from 0~"+(quantity-1)+"\n");
	Scanner sc=new Scanner(System.in);
	int input=sc.nextInt();
	while(input > quantity-1) {
		System.out.println("The input is out of range, try to input again\n");
		input = sc.nextInt();
	}
	
	for(int i=0;i<quantity;i++) {
		if(i != input)zone.getListEtu().get(i).deplacerZoneTreve();
		
	}
	System.out.println("Now the player "+flag+" has moved his students from the zone controled\n");
}



/*public void treveRes() {
	System.out.println("Now we want to put the reservistes into the zones not controlled\n");
	int oneneed = 0;
	int twoneed = 0;
	Scanner scan = new Scanner(System.in);
	System.out.println("Player 1 do you want to add a reserviste to the zones not controlled ? If yes, input 1 \n");
	oneneed=scan.nextInt();
	int sum1=0;
	while(oneneed == 1 && sum1 < 5) {
		for(Etudiant res : this.joueurs.get(0).getListReserv()) {
			System.out.println("This is the reserviste that you want to put ? please answer y/n.\n");
			res.afficherEtu();
			String str=scan.next();
			if(str == "y") {
				
				sum1++;
			}
			
		}
	}
}*/




public ArrayList<Zone> getListZone(){
	return this.zones;
}
public ArrayList<Joueur> getListJoueur(){
	return this.joueurs;
}

}
