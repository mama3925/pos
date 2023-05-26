package lo02xu;

import java.util.*;

public class Joueur {
private int numJoueur;
private int points;
private ArrayList<Etudiant> listEtu;
private ArrayList<Etudiant> listReserv;
private Filiere filiere;
private String nomJoueur;
private ArrayList<Zone> listZoneControlee;
private Control control;

public Joueur(int numJoueur,Control control) {
	this.numJoueur=numJoueur;
	
	this.listEtu=new ArrayList<Etudiant>();
	this.listReserv=new ArrayList<Etudiant>();
	this.listZoneControlee=new ArrayList<Zone>();
	this.nomJoueur="Joueur"+this.numJoueur;
	this.points=400;
	
	this.control=control;
	control.getListJoueur().add(this);
	
	for(int i=1;i<16;i++) {
		Etudiant etu = new Etudiant(i,this);
	}
	
	for(int i=16;i<20;i++) {
		Etudiant etu1=new EtudiantElite(i,this);
	}
	Etudiant etu2=new MaitreDuGobi(20,this);
	
}
public int getNumJoueur() {
	return this.numJoueur;
}
public void setNumJoueur(int num) {
	this.numJoueur=num;
}
public Filiere getFiliere() {
	return this.filiere;
}
public void setFiliere(int index) {
	switch(index) {
	case 0 -> this.filiere=Filiere.ISI;
	case 1 -> this.filiere=Filiere.RT;
	case 2 -> this.filiere=Filiere.A2I;
	case 3 -> this.filiere=Filiere.GI;
	case 4 -> this.filiere=Filiere.GM;
	case 5 -> this.filiere=Filiere.MTE;
	case 6 -> this.filiere=Filiere.MM;
	}
}
public String getNomJoueur() {
	return this.nomJoueur;
}
public void setNomJoueur(String nom) {
	this.nomJoueur=nom;
}
public ArrayList<Etudiant> getListEtu(){
	return this.listEtu;
}
public ArrayList<Etudiant> getListReserv(){
	return this.listReserv;
}
public ArrayList<Zone> getListZoneControlee(){
	return this.listZoneControlee;
}
public int getPoints() {
	return this.points;
}
public void setPoints(int point) {
	this.points=point;
}

public Control getControl() {
	return this.control;
}

public void setReserviste() {
	System.out.println("please input five numbers from 1-20 representing the students got reserved as a reserviste\n");
	Scanner sc=new Scanner(System.in);
	for(int i=0;i<5;i++) {
		int position = sc.nextInt()-1;
		this.listEtu.get(position).addReserviste();
		this.listReserv.add(this.listEtu.get(position));
	}
	
	
}

public void choisirFiliere(int index) {
	System.out.println("Please input the index of the filiere\n");
	System.out.println("0,ISI. 1,RT. 2,A2I. 3,GI. 4,GM, 5,MTE. 6,MM");
	Scanner sc=new Scanner(System.in);
	index=sc.nextInt();
	while(index != 0 || index != 1 || index != 2 || index != 3 || index != 4 || index != 5 || index != 5 || index != 6) {
		System.out.println("Please input again, between 0-6\n");
		index=sc.nextInt();
		
	}
	this.setFiliere(index);
}


public boolean gagneOuPas() {
	boolean boo=false;
	if(this.listZoneControlee.size() >= 3) boo=true;
	return boo;
	
}
}
