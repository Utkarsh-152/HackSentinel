from setuptools import setup, find_packages

setup(
    name="HackSentinel",
    version="0.1",
    author="Utkarsh Tripathi",
    author_email="shreytripathi2004@gmail.com",  # Apna email dal
    description="Cyber Threat Intelligence Bot powered by AI",
    packages=find_packages(),
    install_requires=[
        "flask",
        "requests",
        "beautifulsoup4",
        "scrapy",
        "newspaper3k",
        "nltk",
        "pandas"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.8',
    entry_points={
        "console_scripts": [
            "hacksentinel=backend.app:app"
        ]
    }
)
