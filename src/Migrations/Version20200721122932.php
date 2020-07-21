<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * EJECUTAR EN PRODUCCIÒN LO SIGUIENTE
 *  ALTER TABLE usuario ADD confirmado TINYINT(1) DEFAULT '0' NOT NULL
 * NO LO SIGUIENTE:
 *  ALTER TABLE usuario ADD confirmado TINYINT(1) DEFAULT \'0\' NOT NULL
 * PORQUE DA ERROR CON LAS BARRAS!!
 */

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200721122932 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE usuario ADD confirmado TINYINT(1) DEFAULT \'0\' NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE usuario DROP confirmado');
    }
}
