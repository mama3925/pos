package jdfke;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import java.awt.BorderLayout;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class ZoneAffect {

	private JFrame frame;

	/**
	 * Launch the application.
	 */
	public static void ouvreZone(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ZoneAffect window = new ZoneAffect();
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
	public ZoneAffect() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 558, 384);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		JLabel lblNewLabel = new JLabel("affectation des combattant");
		lblNewLabel.setBounds(185, 22, 175, 25);
		frame.getContentPane().add(lblNewLabel);
		
		JLabel lblNewLabel_1 = new JLabel("halle");
		lblNewLabel_1.setBounds(103, 78, 54, 15);
		frame.getContentPane().add(lblNewLabel_1);
		
		JLabel lblNewLabel_2 = new JLabel("BDE");
		lblNewLabel_2.setBounds(103, 122, 54, 15);
		frame.getContentPane().add(lblNewLabel_2);
		
		JLabel lblNewLabel_3 = new JLabel("biblio");
		lblNewLabel_3.setBounds(103, 184, 54, 15);
		frame.getContentPane().add(lblNewLabel_3);
		
		JLabel lblNewLabel_4 = new JLabel("quartier ad");
		lblNewLabel_4.setBounds(103, 241, 74, 15);
		frame.getContentPane().add(lblNewLabel_4);
		
		JLabel lblNewLabel_5 = new JLabel("halles");
		lblNewLabel_5.setBounds(103, 288, 54, 15);
		frame.getContentPane().add(lblNewLabel_5);
		
		JLabel lblNewLabel_6 = new JLabel("0");
		lblNewLabel_6.setBounds(322, 78, 54, 15);
		frame.getContentPane().add(lblNewLabel_6);
		
		JLabel lblNewLabel_7 = new JLabel("0");
		lblNewLabel_7.setBounds(322, 122, 54, 15);
		frame.getContentPane().add(lblNewLabel_7);
		
		JLabel lblNewLabel_8 = new JLabel("0");
		lblNewLabel_8.setBounds(322, 184, 54, 15);
		frame.getContentPane().add(lblNewLabel_8);
		
		JLabel lblNewLabel_9 = new JLabel("0");
		lblNewLabel_9.setBounds(322, 241, 54, 15);
		frame.getContentPane().add(lblNewLabel_9);
		
		JLabel lblNewLabel_10 = new JLabel("0");
		lblNewLabel_10.setBounds(322, 288, 54, 15);
		frame.getContentPane().add(lblNewLabel_10);
		
		JButton btnNewButton = new JButton("-");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				ListMoinsHalle.OpenMinusHalle(null);
			}
		});
		btnNewButton.setBounds(199, 74, 93, 23);
		frame.getContentPane().add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("+");
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				ListPlusHalle.OpenPlusHalle(null);
			}
		});
		btnNewButton_1.setBounds(356, 74, 93, 23);
		frame.getContentPane().add(btnNewButton_1);
		
		JButton btnNewButton_2 = new JButton("-");
		btnNewButton_2.setBounds(199, 118, 93, 23);
		frame.getContentPane().add(btnNewButton_2);
		
		JButton btnNewButton_3 = new JButton("+");
		btnNewButton_3.setBounds(356, 118, 93, 23);
		frame.getContentPane().add(btnNewButton_3);
		
		JButton btnNewButton_4 = new JButton("-");
		btnNewButton_4.setBounds(199, 180, 93, 23);
		frame.getContentPane().add(btnNewButton_4);
		
		JButton btnNewButton_5 = new JButton("+");
		btnNewButton_5.setBounds(356, 180, 93, 23);
		frame.getContentPane().add(btnNewButton_5);
		
		JButton btnNewButton_6 = new JButton("-");
		btnNewButton_6.setBounds(199, 237, 93, 23);
		frame.getContentPane().add(btnNewButton_6);
		
		JButton btnNewButton_7 = new JButton("+");
		btnNewButton_7.setBounds(356, 237, 93, 23);
		frame.getContentPane().add(btnNewButton_7);
		
		JButton btnNewButton_8 = new JButton("-");
		btnNewButton_8.setBounds(199, 284, 93, 23);
		frame.getContentPane().add(btnNewButton_8);
		
		JButton btnNewButton_9 = new JButton("+");
		btnNewButton_9.setBounds(356, 284, 93, 23);
		frame.getContentPane().add(btnNewButton_9);
	}
}
