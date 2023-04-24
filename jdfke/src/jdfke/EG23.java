package jdfke;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JButton;
import java.awt.BorderLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Font;
import javax.swing.JLabel;
import javax.swing.JMenuBar;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class EG23 {

	private JFrame frmCe;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					EG23 window = new EG23();
					window.frmCe.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public EG23() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frmCe = new JFrame();
		frmCe.setTitle("CestDuBrutal");
		frmCe.setBounds(100, 100, 500, 364);
		frmCe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frmCe.getContentPane().setLayout(null);
		
		JButton btnNewButton = new JButton("Demarrer une partie");
		btnNewButton.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				Affect1.ouvreGestionText(null);
			}
		});
		btnNewButton.setFont(new Font("Calibri", Font.PLAIN, 16));
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnNewButton.setBounds(143, 190, 184, 48);
		frmCe.getContentPane().add(btnNewButton);
		
		JLabel lblNewLabel = new JLabel("La bataille des programme");
		lblNewLabel.setFont(new Font("Calibri", Font.PLAIN, 30));
		lblNewLabel.setBounds(72, 82, 346, 58);
		frmCe.getContentPane().add(lblNewLabel);
		
		JMenuBar menuBar = new JMenuBar();
		frmCe.setJMenuBar(menuBar);
		
		JMenu mnNewMenu = new JMenu("fichier");
		menuBar.add(mnNewMenu);
		
		JMenuItem mntmNewMenuItem = new JMenuItem("ouvrir de fichier");
		mnNewMenu.add(mntmNewMenuItem);
		
		JMenuItem mntmNewMenuItem_1 = new JMenuItem("enregistrer ");
		mnNewMenu.add(mntmNewMenuItem_1);
		
		JMenu mnNewMenu_1 = new JMenu("configurer");
		menuBar.add(mnNewMenu_1);
		
		JMenu mnNewMenu_2 = new JMenu("aide");
		menuBar.add(mnNewMenu_2);
	}
}
