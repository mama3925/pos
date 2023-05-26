package lo02xu;

import java.util.*;

public class Zone {
private NomZone nomZone;
private static int numZone=0;
private ArrayList<Etudiant> listEtu;
private int numOfEtu;
private int indexZone;
private int controlee;
private Control control;

public Zone(Control control) {
	numOfEtu=0;
	this.listEtu= new ArrayList<Etudiant>();
	
	switch(numZone) {
	case 0 ->{
		this.nomZone=NomZone.Bibliotheque;
		this.indexZone=0;
	}
	case 1 ->{
		this.nomZone=NomZone.BureauDesEtudiants;
		this.indexZone=1;
	}
	case 2 ->{
		this.nomZone=NomZone.QuartierAdministratif;
		this.indexZone=2;
	}
	case 3 ->{
		this.nomZone=NomZone.HallesIndustrielles;
		this.indexZone=3;
	}
	case 4 ->{
		this.nomZone=NomZone.HalleSportive;
		this.indexZone=4;
	}
	}
	numZone++;
	this.controlee=0;
	
	this.control=control;
	control.getListZone().add(this);
	
}
public int getIndexZone() {
	return this.indexZone;
}
public void setNumZone(int numZone) {
	this.indexZone=numZone;
}
public NomZone getNomZone() {
	return this.nomZone;
}
public void setNomZone(NomZone nomZone) {
	this.nomZone=nomZone;
}
public int getNumOfEtu() {
	return this.numOfEtu;
}
public void setNumOfEtu(int numOfEtu) {
	this.numOfEtu=numOfEtu;
}
public ArrayList<Etudiant> getListEtu(){
	return this.listEtu;
}

public int isControlee() {
	if(this.controlee==0) {
		ArrayList<Etudiant> tempListEtuJou1=new ArrayList<Etudiant>();
		ArrayList<Etudiant> tempListEtuJou2=new ArrayList<Etudiant>();
		for(Etudiant etu : this.listEtu) {
			if(etu.getJoueur()==this.control.getListJoueur().get(0)) {
				tempListEtuJou1.add(etu);
			}
			else {
				tempListEtuJou2.add(etu);
			}
		}
		int flag1=0;int flag2=0;
		for(Etudiant etu : tempListEtuJou1) {
			flag1+=etu.getEcts();
		}
		for(Etudiant etu : tempListEtuJou2) {
			flag2+=etu.getEcts();
		}
		if(flag1 == 0) {
			this.controlee=1;
			this.control.getListJoueur().get(1).getListZoneControlee().add(this);
			
		}
		else if(flag2 == 0) {
			this.controlee=2;
			this.control.getListJoueur().get(0).getListZoneControlee().add(this);
			
		}
	}
	return controlee;
}

public int getTotalPoints1() {
	int sum=0;
	for(Etudiant etu : this.listEtu) {
		if(etu.isReserviste() == false && etu.getEcts() > 0 && etu.getJoueur() == this.control.getListJoueur().get(0)) {
			sum+=etu.getEcts();
		}
	}
	return sum;
}
public int getTotalPoints2() {
	int sum=0;
	Iterator<Etudiant> it = this.listEtu.iterator();
	while(it.hasNext()) {
		Etudiant etu=(Etudiant)(it.next());
		if(etu.isReserviste() == false && etu.getEcts() > 0 && etu.getJoueur() == this.control.getListJoueur().get(1)) {
			sum+=etu.getEcts();
		}
	}
	return sum;
	
}

public String afficherZone() {
	StringBuffer sb=new StringBuffer();
	sb.append("Zone "+this.getNomZone()+"\n");
	sb.append("Joueur1 a totalement "+this.getTotalPoints1()+" points.\n");
	sb.append("Joueur2 a totalement "+this.getTotalPoints2()+" points.\n");
	return sb.toString();
}

}
