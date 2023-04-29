package jdfke;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import javax.swing.JList;
import javax.swing.AbstractListModel;
import javax.swing.JScrollPane;
import javax.swing.JButton;

public class ListMoinsHalle {

	private JFrame frame;

	/**
	 * Launch the application.
	 */
	public static void OpenMinusHalle(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ListMoinsHalle window = new ListMoinsHalle();
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
	public ListMoinsHalle() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		JPanel panel = new JPanel();
		frame.getContentPane().add(panel, BorderLayout.WEST);
		
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
		frame.getContentPane().add(panel_1, BorderLayout.SOUTH);
		
		JButton btnNewButton = new JButton("valider");
		panel_1.add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("melee");
		panel_1.add(btnNewButton_1);
	}

}
