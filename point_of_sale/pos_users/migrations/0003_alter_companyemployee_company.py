# Generated by Django 4.2.10 on 2024-03-19 05:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pos_users', '0002_alter_companyemployee_managers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyemployee',
            name='company',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pos_users.company'),
        ),
    ]