package jdfke;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JList;
import java.awt.BorderLayout;
import javax.swing.AbstractListModel;
import java.awt.ScrollPane;
import java.awt.Panel;
import javax.swing.JScrollPane;

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
		
		Panel panel = new Panel();
		frame.getContentPane().add(panel, BorderLayout.EAST);
		
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
	}

}
