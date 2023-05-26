package lo02xu;

import java.util.Scanner;

public class EtudiantElite extends Etudiant {
public EtudiantElite(int numEtu,Joueur joueur) {
	super(numEtu,joueur);
	this.setDexterite(1);
	this.setForce(1);
	this.setResistance(1);
	this.setConstitution(5);
	this.setInitiative(1);
}

public String afficherEtu() {
	StringBuffer sb=new StringBuffer();
	sb.append("the EtudiantElite "+this.getNumEtu()+" of filiere "+this.getFiliere()+" has\n");
	sb.append(this.getEcts()+ " ects\n");
	sb.append(this.getForce()+" force\n");
	sb.append(this.getDexterite()+" dexterite\n");
	sb.append(this.getResistance()+" resistance\n");
	sb.append(this.getConstitution()+" constitution\n");
	sb.append(this.getInitiative()+" initiative\n");
	sb.append("in the zone "+this.getZone()+"\n");
	return sb.toString();
}

public void modifierDataEtu(int force,int dexterite,int resistance,int constitution,int initiative) {
	System.out.print("---Now you need to initialize the EtudiantElite"+this.getNumEtu()+"---\n");
	System.out.print("the force, dex, res, init are between 1 and 11, the constitution is between 5 and 35\n");
	System.out.print("you should input the right statistic for the propreties\n");
	int forceIn;int dexIn;int resIn;int consIn;int initIn;
	int error=1;
	while(error==1) {
		Scanner scan=new Scanner(System.in);
		forceIn=scan.nextInt();
		dexIn=scan.nextInt();
		resIn=scan.nextInt();
		consIn=scan.nextInt();
		initIn=scan.nextInt();
		
		if(forceIn>=1 && forceIn<=11) {
			if(dexIn>=1 && dexIn<=11) {
				if(resIn>=1 && resIn<=11) {
					if(consIn>=5 && consIn<=35) {
						if(initIn>=1 && initIn<=11) {
							if(forceIn+dexIn+resIn+consIn+initIn <= this.getJoueur().getPoints()) {
								this.setForce(forceIn);;
								this.setDexterite(dexIn);
								this.setResistance(resIn);
								this.setConstitution(consIn);this.setEcts(consIn-this.getConstitution());
								this.setInitiative(initIn);
								error=0;
								scan.close();
							}
							else System.out.println("Your total points affected to the student is higher than the points of Joueur.\n");
						}
						else System.out.println("initiative should be 1-11");
					} 
					else System.out.println("constitution should be 5-35\n");
				} 
				else System.out.println("resistance should be 1-11\n");
			} 
			else System.out.println("dexterite should be 1-11\n");
		}
		else System.out.println("force should be 1-11\n");
	}
	 
}
}
