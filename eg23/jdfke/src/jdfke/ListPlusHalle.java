package jdfke;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JList;
import java.awt.BorderLayout;
import javax.swing.AbstractListModel;
import java.awt.ScrollPane;
import java.awt.Panel;
import javax.swing.JScrollPane;
import javax.swing.JPanel;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JRadioButton;
import javax.swing.JCheckBox;

public class ListPlusHalle {

	private JFrame frame;

	/**
	 * Launch the application.
	 */
	public static void OpenPlusHalle(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ListPlusHalle window = new ListPlusHalle();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public ListPlusHalle() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		Panel panel = new Panel();
		panel.setBounds(0, 0, 91, 232);
		frame.getContentPane().add(panel);
		
		JScrollPane scrollPane = new JScrollPane();
		panel.add(scrollPane);
		
		JList list = new JList();
		scrollPane.setViewportView(list);
		list.setModel(new AbstractListModel() {
			String[] values = new String[] {"Etudiant1", "Etudiant2", "Etudiant3", "Etudiant4", "Etudiant5", "Etudiant6", "Etudiant7", "Etudiant8", "Etudiant9", "Etudiant10", "Etudiant11", "Etudiant12", "Etudiant13", "Etudiant14", "Etudiant15", "Etudiant16", "Etudiant17", "Etudiant18", "Etudiant19", "Etudiant20"};
			public int getSize() {
				return values.length;
			}
			public Object getElementAt(int index) {
				return values[index];
			}
		});
		
		JPanel panel_1 = new JPanel();
		panel_1.setBounds(0, 232, 438, 33);
		frame.getContentPane().add(panel_1);
		
		JButton btnNewButton = new JButton("valider");
		panel_1.add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("retirer");
		panel_1.add(btnNewButton_1);
		
		JLabel lblNewLabel = new JLabel("dexterite");
		lblNewLabel.setBounds(118, 46, 54, 15);
		frame.getContentPane().add(lblNewLabel);
		
		JLabel lblNewLabel_1 = new JLabel("force");
		lblNewLabel_1.setBounds(118, 71, 54, 15);
		frame.getContentPane().add(lblNewLabel_1);
		
		JLabel lblNewLabel_2 = new JLabel("resistance");
		lblNewLabel_2.setBounds(118, 96, 66, 15);
		frame.getContentPane().add(lblNewLabel_2);
		
		JLabel lblNewLabel_3 = new JLabel("Constitution");
		lblNewLabel_3.setBounds(118, 135, 72, 15);
		frame.getContentPane().add(lblNewLabel_3);
		
		JLabel lblNewLabel_4 = new JLabel("Initiative");
		lblNewLabel_4.setBounds(118, 170, 66, 15);
		frame.getContentPane().add(lblNewLabel_4);
		
		JLabel lblNewLabel_5 = new JLabel("ects");
		lblNewLabel_5.setBounds(118, 21, 54, 15);
		frame.getContentPane().add(lblNewLabel_5);
		
		JRadioButton rdbtnNewRadioButton = new JRadioButton("offensif");
		rdbtnNewRadioButton.setBounds(311, 17, 121, 23);
		frame.getContentPane().add(rdbtnNewRadioButton);
		
		JRadioButton rdbtnNewRadioButton_1 = new JRadioButton("defensif");
		rdbtnNewRadioButton_1.setBounds(311, 63, 121, 23);
		frame.getContentPane().add(rdbtnNewRadioButton_1);
		
		JRadioButton rdbtnNewRadioButton_2 = new JRadioButton("aleatoire");
		rdbtnNewRadioButton_2.setBounds(311, 107, 121, 23);
		frame.getContentPane().add(rdbtnNewRadioButton_2);
		
		JCheckBox chckbxNewCheckBox = new JCheckBox("reserviste");
		chckbxNewCheckBox.setBounds(311, 166, 103, 23);
		frame.getContentPane().add(chckbxNewCheckBox);
	}
}
