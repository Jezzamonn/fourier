#!/bin/bash
gsutil -m cp *.html gs://www.jezzamon.com/fourier-wip1/
gsutil -m cp -r build/ gs://www.jezzamon.com/fourier-wip1/
gsutil -m cp -r css/ gs://www.jezzamon.com/fourier-wip1/
gsutil -m acl ch -r -u AllUsers:R gs://www.jezzamon.com/fourier-wip1