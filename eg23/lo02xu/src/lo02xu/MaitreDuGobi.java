package lo02xu;

import java.util.Scanner;

public class MaitreDuGobi extends Etudiant {
public MaitreDuGobi(int numEtu, Joueur joueur) {
	super(numEtu,joueur);
	this.setDexterite(2);
	this.setForce(2);
	this.setResistance(2);
	this.setConstitution(10);
	this.setInitiative(2);
}

public String afficherEtu() {
	StringBuffer sb=new StringBuffer();
	sb.append("the MaitreDuGobi"+this.getNumEtu()+" of filiere "+this.getFiliere()+" has\n");
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
	System.out.print("---Now you need to initialize the MaitreDuGobi"+this.getNumEtu()+"---\n");
	System.out.print("the force, dex, res, init are between 2 and 12, the constitution is between 10 and 40\n");
	System.out.print("you should input the right statistic for the propreties");
	int forceIn;int dexIn;int resIn;int consIn;int initIn;
	int error=1;
	while(error==1) {
		Scanner scan=new Scanner(System.in);
		forceIn=scan.nextInt();
		dexIn=scan.nextInt();
		resIn=scan.nextInt();
		consIn=scan.nextInt();
		initIn=scan.nextInt();
		
		if(forceIn>=2 && forceIn<=12) {
			if(dexIn>=2 && dexIn<=12) {
				if(resIn>=2 && resIn<=12) {
					if(consIn>=10 && consIn<=40) {
						if(initIn>=2 && initIn<=12) {
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
						else System.out.println("initiative should be 2-12");
					} 
					else System.out.println("constitution should be 10-40\n");
				} 
				else System.out.println("resistance should be 2-12\n");
			} 
			else System.out.println("dexterite should be 2-12\n");
		}
		else System.out.println("force should be 2-12\n");
	}
	 
}

}
