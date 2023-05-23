package jdfke;
essai
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import java.awt.Font;
import javax.swing.JTextField;
import javax.swing.JCheckBox;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JComboBox;
import javax.swing.JRadioButton;
import javax.swing.ButtonGroup;

public class Affect1 {

	private JFrame frmAffectplayer;
	private JTextField textField;
	private JTextField textField_1;
	private JTextField textField_2;
	private JTextField textField_3;
	private JTextField textField_4;
	private final ButtonGroup buttonGroup = new ButtonGroup();

	/**
	 * Launch the application.
	 */
	public static void ouvreGestionText(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Affect1 window = new Affect1();
					window.frmAffectplayer.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public Affect1() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frmAffectplayer = new JFrame();
		frmAffectplayer.setTitle("AffectPlayer1");
		frmAffectplayer.setBounds(100, 100, 592, 430);
		frmAffectplayer.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frmAffectplayer.getContentPane().setLayout(null);
		
		JLabel lblNewLabel = new JLabel("parametrage des troupes");
		lblNewLabel.setFont(new Font("Calibri", Font.PLAIN, 14));
		lblNewLabel.setBounds(180, 25, 185, 33);
		frmAffectplayer.getContentPane().add(lblNewLabel);
		
		JLabel lblNewLabel_1 = new JLabel("veuillez repartir vos 400 points dans les categories ci-dessous ");
		lblNewLabel_1.setFont(new Font("Calibri", Font.PLAIN, 12));
		lblNewLabel_1.setBounds(87, 56, 377, 42);
		frmAffectplayer.getContentPane().add(lblNewLabel_1);
		
		JLabel lblNewLabel_2 = new JLabel("force");
		lblNewLabel_2.setBounds(148, 125, 54, 15);
		frmAffectplayer.getContentPane().add(lblNewLabel_2);
		
		JLabel lblNewLabel_3 = new JLabel("dexterite");
		lblNewLabel_3.setBounds(148, 164, 54, 15);
		frmAffectplayer.getContentPane().add(lblNewLabel_3);
		
		JLabel lblNewLabel_4 = new JLabel("resistance");
		lblNewLabel_4.setBounds(148, 219, 75, 23);
		frmAffectplayer.getContentPane().add(lblNewLabel_4);
		
		JLabel lblNewLabel_5 = new JLabel("constitution");
		lblNewLabel_5.setBounds(148, 278, 75, 15);
		frmAffectplayer.getContentPane().add(lblNewLabel_5);
		
		JLabel lblNewLabel_6 = new JLabel("initiative");
		lblNewLabel_6.setBounds(148, 326, 67, 15);
		frmAffectplayer.getContentPane().add(lblNewLabel_6);
		
		textField = new JTextField();
		textField.setBounds(276, 122, 66, 21);
		frmAffectplayer.getContentPane().add(textField);
		textField.setColumns(10);
		
		textField_1 = new JTextField();
		textField_1.setBounds(276, 161, 66, 21);
		frmAffectplayer.getContentPane().add(textField_1);
		textField_1.setColumns(10);
		
		textField_2 = new JTextField();
		textField_2.setBounds(276, 220, 66, 21);
		frmAffectplayer.getContentPane().add(textField_2);
		textField_2.setColumns(10);
		
		textField_3 = new JTextField();
		textField_3.setBounds(276, 275, 66, 21);
		frmAffectplayer.getContentPane().add(textField_3);
		textField_3.setColumns(10);
		
		textField_4 = new JTextField();
		textField_4.setBounds(276, 323, 66, 21);
		frmAffectplayer.getContentPane().add(textField_4);
		textField_4.setColumns(10);
		
		JCheckBox chckbxNewCheckBox = new JCheckBox("reserviste");
		chckbxNewCheckBox.setBounds(423, 121, 103, 23);
		frmAffectplayer.getContentPane().add(chckbxNewCheckBox);
		
		JButton btnNewButton = new JButton("valider");
		btnNewButton.setBounds(457, 274, 93, 23);
		frmAffectplayer.getContentPane().add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("next");
		
		
		
		btnNewButton_1.setBounds(457, 219, 93, 23);
		frmAffectplayer.getContentPane().add(btnNewButton_1);
		
		JButton btnNewButton_2 = new JButton("back");
	
		
		
		btnNewButton_2.setBounds(457, 160, 93, 23);
		frmAffectplayer.getContentPane().add(btnNewButton_2);
		
		JLabel lblNewLabel_7 = new JLabel("Etudiant");
		lblNewLabel_7.setBounds(392, 32, 54, 15);
		frmAffectplayer.getContentPane().add(lblNewLabel_7);
		
		JLabel lblNewLabel_8 = new JLabel("1");
		lblNewLabel_8.setBounds(457, 32, 54, 15);
		frmAffectplayer.getContentPane().add(lblNewLabel_8);
		
		JButton btnNewButton_3 = new JButton("etape suivant(zone)");
		btnNewButton_3.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				ZoneAffect.ouvreZone(null);
				
			}
		});
		btnNewButton_3.setBounds(410, 322, 160, 33);
		frmAffectplayer.getContentPane().add(btnNewButton_3);
		
		JRadioButton rdbtnNewRadioButton = new JRadioButton("offensive");
		buttonGroup.add(rdbtnNewRadioButton);
		rdbtnNewRadioButton.setBounds(6, 160, 121, 23);
		frmAffectplayer.getContentPane().add(rdbtnNewRadioButton);
		
		JRadioButton rdbtnNewRadioButton_1 = new JRadioButton("defensive");
		buttonGroup.add(rdbtnNewRadioButton_1);
		rdbtnNewRadioButton_1.setBounds(6, 205, 121, 23);
		frmAffectplayer.getContentPane().add(rdbtnNewRadioButton_1);
		
		
		
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int pv; 
				pv= Integer.valueOf(lblNewLabel_8.getText());
				if(pv < 20) lblNewLabel_8.setText(String.valueOf(pv+1));
			}
		});
		btnNewButton_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int pv; 
				pv= Integer.valueOf(lblNewLabel_8.getText());
				if(pv > 1) lblNewLabel_8.setText(String.valueOf(pv-1));
			}
		});
	}
}
